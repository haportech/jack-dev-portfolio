import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { featuredProjects } from '../src/data/portfolio.js'

const require = createRequire(new URL('../../supplytrace/package.json', import.meta.url))
const { chromium } = require('@playwright/test')
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3000'
const output = fileURLToPath(new URL('../docs/checks/', import.meta.url))
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const page = await context.newPage()
const results = []
const pageErrors = []
const emailRequests = []
let emailResponse = 'success'
page.on('pageerror', error => pageErrors.push(error.message))

// Every EmailJS request is fulfilled locally before any page script can send mail.
await context.route(/^https:\/\/[^/]*emailjs[^/]*\//i, async route => {
  emailRequests.push({ method: route.request().method(), url: route.request().url() })
  await route.fulfill({
    status: emailResponse === 'success' ? 200 : 500,
    contentType: 'text/plain',
    headers: { 'access-control-allow-origin': '*' },
    body: emailResponse === 'success' ? 'OK' : 'Test delivery failure',
  })
})
const videoRequests = []
page.on('request', request => {
  if (/\.(mp4|webm|mov)(?:\?|$)/i.test(request.url())) videoRequests.push(request.url())
})

async function step(name, action) {
  await action()
  results.push({ name, passed: true })
  console.log(`PASS ${name}`)
}
async function ready() {
  await page.waitForSelector('#project-tabs [role="tab"]')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1000)
}
async function selected(index) {
  const tabs = page.locator('#project-tabs [role="tab"]')
  assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true')
  assert.equal(await tabs.nth(index).getAttribute('tabindex'), '0')
  assert.equal(await page.locator('#project-tabs [aria-selected="true"]').count(), 1)
  assert.equal(await page.locator('#project-panels .project-panel:not([hidden])').count(), 1)
  const panel = page.locator(`#${await tabs.nth(index).getAttribute('aria-controls')}`)
  assert.equal(await panel.isVisible(), true)
  assert.equal(await panel.locator('h3').textContent(), featuredProjects[index].title)
  return panel
}
async function assertImage(locator) {
  await locator.evaluate(async image => {
    if (!image.complete) await new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true })
      image.addEventListener('error', reject, { once: true })
    })
  })
  assert.ok(await locator.evaluate(image => image.complete && image.naturalWidth > 0), 'Image failed to load')
}
async function theme(value) {
  if (await page.locator('html').getAttribute('data-theme') !== value) await page.locator('#theme-toggle').click()
  assert.equal(await page.locator('html').getAttribute('data-theme'), value)
  assert.equal(await page.locator('#theme-toggle').getAttribute('aria-pressed'), String(value === 'dark'))
}

try {
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await ready()
  await step('three tabs, rapid switching, keyboard wrap, Home and End', async () => {
    const tabs = page.locator('#project-tabs [role="tab"]')
    assert.equal(await tabs.count(), 3)
    assert.equal(featuredProjects.length, 3)
    await selected(0)
    for (let index = 0; index < 3; index++) { await tabs.nth(index).click(); await selected(index) }
    await tabs.evaluateAll(elements => { for (const index of [2, 0, 1, 2, 1, 0]) elements[index].click() })
    await selected(0)
    await tabs.nth(0).focus()
    for (const [key, index] of [['ArrowLeft', 2], ['ArrowRight', 0], ['End', 2], ['Home', 0]]) {
      await page.keyboard.press(key)
      await selected(index)
      assert.equal(await tabs.nth(index).evaluate(element => element === document.activeElement), true)
    }
  })
  await step('correct case data, loaded screenshots, modal inertness and focus restore', async () => {
    for (let index = 0; index < 3; index++) {
      await page.locator('#project-tabs [role="tab"]').nth(index).click()
      const panel = await selected(index)
      await assertImage(panel.locator('.project-viewport img'))
      const trigger = panel.locator('.case-button')
      await trigger.click()
      assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open && dialog.matches(':modal')), true)
      const project = featuredProjects[index]
      assert.equal(await page.locator('#case-title').textContent(), project.title)
      assert.equal(await page.locator('#case-description').textContent(), project.description)
      assert.deepEqual(await page.locator('#case-facts dd').allTextContents(), [project.role, project.scale, project.outcome])
      assert.deepEqual(await page.locator('#case-links a').evaluateAll(links => links.map(link => link.href)), project.links.map(link => new URL(link.url, baseURL).href))
      await assertImage(page.locator('#case-image'))
      assert.equal(await page.locator('#case-image').getAttribute('src'), project.detail)
      assert.equal(await page.evaluate(() => {
        const background = document.querySelector('#theme-toggle')
        background.focus()
        return document.activeElement === background
      }), false, 'Modal background accepted focus')
      await page.locator('#close-case').click()
      assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), false)
      assert.equal(await trigger.evaluate(element => element === document.activeElement), true)
      await trigger.click()
      await page.keyboard.press('Escape')
      assert.equal(await page.locator('#case-dialog').evaluate(dialog => dialog.open), false)
      assert.equal(await trigger.evaluate(element => element === document.activeElement), true)
    }
    assert.equal(await page.locator('video, source[type^="video/"]').count(), 0)
    assert.deepEqual(videoRequests, [])
  })
  await step('theme controls and all 15 archive entries', async () => {
    await theme('dark'); await theme('light')
    const more = page.locator('#archive-more')
    await more.locator('summary').click()
    assert.equal(await more.getAttribute('open') !== null, true)
    assert.equal(await page.locator('.archive-row').count(), 15)
    for (const row of await page.locator('.archive-row').all()) assert.equal(await row.isVisible(), true)
    assert.equal(await page.locator('.private-project').filter({ hasText: /^Private project$/ }).count(), 4)
    await page.locator('#project-tabs [role="tab"]').nth(1).click()
    const supplyPanel = await selected(1)
    assert.equal(await supplyPanel.locator('.project-actions a').textContent(), 'GitHub')
    assert.equal(await supplyPanel.locator('.project-actions a').getAttribute('href'), 'https://github.com/haportech/supplytrace/tree/codex/local-full-scan')
  })
  await step('mobile navigation opens, toggles, closes on link and Escape', async () => {
    await page.setViewportSize({ width: 390, height: 844 })
    const menu = page.locator('#mobile-menu')
    const nav = page.locator('#primary-nav')
    assert.equal(await menu.isVisible(), true)
    assert.equal(await menu.getAttribute('aria-expanded'), 'false')
    await menu.click()
    assert.equal(await menu.getAttribute('aria-expanded'), 'true')
    assert.equal(await nav.isVisible(), true)
    await menu.click()
    assert.equal(await menu.getAttribute('aria-expanded'), 'false')
    await menu.click()
    await nav.locator('a').first().click()
    assert.equal(await menu.getAttribute('aria-expanded'), 'false')
    await menu.click(); await page.keyboard.press('Escape')
    assert.equal(await menu.getAttribute('aria-expanded'), 'false')
    assert.equal(await menu.evaluate(element => element === document.activeElement), true)
  })
  await step('no overflow at five widths in both themes', async () => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 })
      for (const value of ['light', 'dark']) {
        await theme(value)
        await page.waitForTimeout(350)
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px ${value} overflow`)
        if (width === 390 || width === 1440) {
          await page.evaluate(() => scrollTo(0, 0))
          await page.screenshot({ path: `${output}portfolio-${width}-${value}.png` })
        }
      }
    }
  })
  await step('selection, editable controls, drag suppression and valid links', async () => {
    assert.equal(await page.locator('body').evaluate(element => getComputedStyle(element).userSelect), 'none')
    for (const selector of ['#name', '#email', '#message']) {
      const field = page.locator(selector)
      assert.equal(await field.isEditable(), true)
      assert.equal(await field.evaluate(element => getComputedStyle(element).userSelect), 'text')
    }
    for (const selector of ['#project-panels img', 'a[href]']) {
      assert.equal(await page.locator(selector).first().evaluate(element => {
        const event = new Event('dragstart', { bubbles: true, cancelable: true })
        element.dispatchEvent(event)
        return event.defaultPrevented
      }), true)
    }
    assert.equal(await page.locator('#name').evaluate(element => {
      const event = new Event('dragstart', { bubbles: true, cancelable: true })
      element.dispatchEvent(event)
      return event.defaultPrevented
    }), false)
    const issues = await page.locator('a[href]').evaluateAll(links => links.flatMap(link => {
      const raw = link.getAttribute('href')
      if (!raw || raw === '#') return ['Empty link']
      if (raw.startsWith('#')) return document.getElementById(raw.slice(1)) ? [] : [`Missing anchor ${raw}`]
      const url = new URL(raw, location.href)
      if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return [`Bad protocol ${raw}`]
      if (url.protocol === 'mailto:' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(url.pathname)) return [`Bad email ${raw}`]
      if (link.target === '_blank' && (!link.relList.contains('noopener') || !link.relList.contains('noreferrer'))) return [`Unsafe new tab ${raw}`]
      return []
    }))
    assert.deepEqual(issues, [])
    assert.ok(await page.locator('a[href^="mailto:"]').count())
    assert.ok(await page.locator('a[href*="github.com/haportech"]').count())
    assert.ok(await page.locator('a[href*="t.me/haportech"]').count())
  })
  await step('contact invalid validation, intercepted success and intercepted failure', async () => {
    const submit = page.locator('#contact-form button[type="submit"]')
    await submit.click()
    for (const field of ['name', 'email', 'message']) {
      assert.equal(await page.locator(`#${field}`).getAttribute('aria-invalid'), 'true')
      assert.ok((await page.locator(`#${field}-error`).textContent()).trim())
    }
    assert.equal(emailRequests.length, 0)
    await page.locator('#name').fill('Portfolio check')
    await page.locator('#email').fill('invalid')
    await page.locator('#message').fill('Intercepted verification only. No email is sent.')
    await submit.click()
    assert.equal(await page.locator('#email').getAttribute('aria-invalid'), 'true')
    assert.equal(emailRequests.length, 0)
    await page.locator('#email').fill('portfolio-check@example.invalid')
    await submit.click()
    await page.waitForSelector('#form-status.is-success')
    assert.match(await page.locator('#form-status').textContent(), /message sent/i)
    assert.equal(emailRequests.length, 1)
    for (const field of ['name', 'email', 'message']) assert.equal(await page.locator(`#${field}`).inputValue(), '')
    emailResponse = 'failure'
    await page.locator('#name').fill('Portfolio check')
    await page.locator('#email').fill('portfolio-check@example.invalid')
    await page.locator('#message').fill('Intercepted failure check only.')
    await submit.click()
    await page.waitForSelector('#form-status.is-error')
    assert.match(await page.locator('#form-status').textContent(), /could not send/i)
    assert.equal(emailRequests.length, 2)
    assert.equal(await submit.isEnabled(), true)
    assert.equal(await page.locator('#message').inputValue(), 'Intercepted failure check only.')
    assert.ok(emailRequests.every(request => request.method === 'POST' && new URL(request.url).hostname === 'api.emailjs.com'))
  })
  await step('reduced motion is static', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(baseURL, { waitUntil: 'networkidle' }); await ready()
    await page.locator('#project-tabs [role="tab"]').nth(1).click()
    await page.waitForTimeout(100)
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0)
    const before = await page.locator('.project-shell').evaluate(element => getComputedStyle(element).transform)
    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.waitForTimeout(150)
    assert.equal(await page.locator('.project-shell').evaluate(element => getComputedStyle(element).transform), before)
  })
  await step('SEO title, canonical, favicon, schema, robots, sitemap and privacy', async () => {
    assert.match(await page.title(), /Jack/i)
    assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 40)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    assert.equal(new URL(canonical).protocol, 'https:')
    const icon = await page.locator('link[rel~="icon"]').first().getAttribute('href')
    assert.ok(icon && !icon.startsWith('data:'), 'Use the authored favicon asset')
    const iconResponse = await page.request.get(new URL(icon, baseURL).href)
    assert.equal(iconResponse.ok(), true)
    assert.match(iconResponse.headers()['content-type'] || '', /image/)
    for (const path of ['/favicon-192.png', '/apple-touch-icon.png', '/social-share.png', '/site.webmanifest']) {
      const asset = await page.request.get(new URL(path, baseURL).href)
      assert.equal(asset.ok(), true, path)
      assert.match(asset.headers()['content-type'] || '', /image|manifest/, path)
    }
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
    assert.ok(schemas.length)
    for (const raw of schemas) {
      const schema = JSON.parse(raw)
      assert.ok(schema['@context'] && (schema['@type'] || schema['@graph']))
    }
    for (const [path, pattern] of [['/robots.txt', /sitemap:/i], ['/sitemap.xml', /<urlset[\s>]/i], ['/privacy/', /privacy/i]]) {
      const response = await page.request.get(new URL(path, baseURL).href)
      assert.equal(response.ok(), true, path)
      assert.match(await response.text(), pattern)
    }
  })
  assert.deepEqual(pageErrors, [], 'Browser page errors')
  assert.deepEqual(videoRequests, [], 'Unexpected video request')
  await writeFile(`${output}portfolio-verification.json`, JSON.stringify({ baseURL, passed: true, checks: results, emailRequestsIntercepted: emailRequests.length, pageErrors, videoRequests, reducedMotionCapture: 'Interaction/layout screenshots use normal motion after settlement; final static check emulates reduce.' }, null, 2))
  console.log(`PASS ${results.length} checks; 2 EmailJS calls intercepted; report docs/checks/portfolio-verification.json`)
} catch (error) {
  await page.screenshot({ path: `${output}portfolio-failure.png`, fullPage: true }).catch(() => {})
  await writeFile(`${output}portfolio-verification.json`, JSON.stringify({ baseURL, passed: false, checks: results, failure: String(error), pageErrors, emailRequestsIntercepted: emailRequests.length }, null, 2))
  console.error(`FAIL ${error.message}`)
  process.exitCode = 1
} finally {
  await browser.close()
}
