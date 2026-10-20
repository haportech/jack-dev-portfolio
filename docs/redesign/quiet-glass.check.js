async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message) }
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 1100 })
  await page.goto('http://127.0.0.1:3000/docs/redesign/quiet-glass.html')
  await page.evaluate(() => document.fonts.ready)
  const tabs = page.getByRole('tab')
  assert(await tabs.count() === 3, 'Three project tabs must render')
  for (const index of [1, 2, 0, 2, 1, 0]) {
    await tabs.nth(index).click()
    assert(await tabs.nth(index).getAttribute('aria-selected') === 'true', 'Project tab selection must stay current')
    assert(await page.getByRole('tabpanel').count() === 1, 'Only the selected project may be exposed')
  }
  await tabs.nth(0).focus()
  await page.keyboard.press('ArrowLeft')
  assert(await tabs.nth(2).getAttribute('aria-selected') === 'true', 'ArrowLeft wraps to last project')
  await page.keyboard.press('Home')
  assert(await tabs.nth(0).getAttribute('aria-selected') === 'true', 'Home selects first project')
  await page.getByRole('button', { name: 'Inside the project' }).click()
  assert(await page.locator('#case-dialog').evaluate(el => el.open), 'Case dialog opens')
  assert(await page.locator('#case-title').textContent() === 'Jack Exchange', 'Case dialog shows selected project')
  await page.keyboard.press('Escape')
  assert(!await page.locator('#case-dialog').evaluate(el => el.open), 'Escape closes case dialog')
  assert(await page.getByRole('button', { name: 'Inside the project' }).evaluate(el => el === document.activeElement), 'Dialog returns focus to its trigger')
  await page.getByRole('button', { name: 'Play project demo' }).click()
  await page.waitForFunction(() => {
    const panel = document.querySelector('.project-panel:not([hidden])')
    return !panel.querySelector('video').paused || !panel.querySelector('.media-status').hidden
  })
  const videoPlaying = await page.getByRole('tabpanel').locator('video').evaluate(v => !v.paused && !v.hidden)
  assert(videoPlaying, 'Local demo video plays after a user click')
  await tabs.nth(1).click()
  assert(await page.locator('video').evaluateAll(videos => videos.every(v => v.paused)), 'Changing projects pauses the previous video')
  await page.getByRole('button', { name: 'Inside the project' }).click()
  assert(await page.locator('#case-title').textContent() === 'SupplyTrace', 'Case content changes with selection')
  await page.getByRole('button', { name: 'Close case study' }).click()
  for (const index of [1, 2]) {
    await tabs.nth(index).click()
    await page.getByRole('button', { name: 'Play project demo' }).click()
    await page.waitForFunction(() => !document.querySelector('.project-panel:not([hidden]) video').paused)
    await page.getByRole('button', { name: 'Show screenshot' }).click()
    assert(await page.getByRole('tabpanel').locator('video').evaluate(v => v.paused && v.hidden), 'Screenshot action pauses each demo')
    await page.getByRole('button', { name: 'Inside the project' }).click()
    await page.getByRole('dialog').getByRole('link').last().focus()
    await page.keyboard.press('Tab')
    assert(await page.locator('#case-dialog').evaluate(el => el.contains(document.activeElement) || document.activeElement === document.body), 'Native modal keeps page controls inert while allowing browser chrome focus')
    await page.locator('#theme-toggle').evaluate(el => el.focus())
    assert(!await page.locator('#theme-toggle').evaluate(el => el === document.activeElement), 'Background controls cannot receive focus while modal is open')
    await page.getByRole('button', { name: 'Close case study' }).click()
  }
  const layouts = []
  for (const theme of ['light', 'dark']) {
    if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#theme-toggle').click()
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 })
      const measure = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }))
      assert(measure.scrollWidth === measure.width, `Overflow at ${width}px in ${theme}`)
      layouts.push({ theme, ...measure })
    }
  }
  await page.locator('#archive-more summary').click()
  assert(await page.locator('#archive-more').getAttribute('open') !== null, 'Archive expands')
  assert(await page.locator('.archive-row').count() === 15, 'All fifteen archive entries are retained')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1100 })
  await page.goto('http://127.0.0.1:3000/docs/redesign/quiet-glass.html')
  const reduced = await page.evaluate(() => ({ behavior: getComputedStyle(document.documentElement).scrollBehavior, running: document.getAnimations().filter(a => a.playState === 'running').length }))
  assert(reduced.behavior === 'auto' && reduced.running === 0, 'Reduced motion disables intro and scroll animation')
  const images = await page.locator('.project-panel img').evaluateAll(images => images.map(i => ({ src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0 })))
  assert(images.every(image => image.loaded), 'Project screenshots load')
  await page.route('**/media/jack-exchange-flow.mp4', route => route.abort())
  await page.goto('http://127.0.0.1:3000/docs/redesign/quiet-glass.html')
  await page.getByRole('button', { name: 'Play project demo' }).click()
  await page.waitForFunction(() => !document.querySelector('.project-panel:not([hidden]) .media-status').hidden)
  assert(await page.getByRole('tabpanel').locator('img').isVisible(), 'Media failure restores the screenshot')
  const mediaFailureHandled = await page.getByRole('status').isVisible()
  await page.unroute('**/media/jack-exchange-flow.mp4')
  assert(errors.length === 0, 'No browser JavaScript errors')
  return { passed: true, layouts, videoPlaying, images, reduced, mediaFailureHandled, errors }
}
