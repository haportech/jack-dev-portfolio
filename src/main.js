import './style.css'
import emailjs from '@emailjs/browser'
import { featuredProjects, projectArchive, capabilityGroups } from './data/portfolio.js'
import { initKineticReel } from './effects/kinetic-reel.js'

const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>'

function projectLinks(links, className = 'text-link') {
  return links.map(({ label, url }) => `<a class="${className}" href="${url}" target="_blank" rel="noopener noreferrer"><span>${label}</span>${arrow}</a>`).join('')
}

function renderFeaturedProjects() {
  const root = document.querySelector('#featured-reel')
  root.innerHTML = featuredProjects.map((project) => `
    <article class="reel-scene reel-scene--${project.id}" style="--project-accent: ${project.accent}">
      <div class="reel-stage">
        <div class="scene-number" aria-hidden="true">${project.number}</div>
        <div class="scene-copy">
          <p class="project-kicker">${project.kicker}</p>
          <h3>${project.title}</h3>
          <p class="project-statement">${project.statement}</p>
          <p class="project-description">${project.description}</p>
          <div class="project-links">${projectLinks(project.links)}</div>
        </div>
        <div class="project-media">
          <div class="browser-frame">
            <div class="browser-bar" aria-hidden="true"><span></span><span></span><span></span><i></i></div>
            <video muted loop playsinline preload="metadata" poster="${project.poster}" aria-label="${project.alt}">
              <source src="${project.video}" type="video/mp4" />
            </video>
          </div>
          <img class="project-detail" src="${project.detail}" alt="${project.alt}" loading="lazy" />
        </div>
        <dl class="project-meta">
          <div><dt>Role</dt><dd>${project.role}</dd></div>
          <div><dt>Scale</dt><dd>${project.scale}</dd></div>
          <div><dt>Status</dt><dd><span class="status-pip"></span>${project.status}</dd></div>
          <div><dt>Outcome</dt><dd>${project.outcome}</dd></div>
        </dl>
      </div>
    </article>
  `).join('')
}

function renderArchive() {
  const track = document.querySelector('#project-track')
  track.innerHTML = projectArchive.map((project, index) => `
    <article class="archive-card">
      <div class="archive-card-top"><span>${String(index + 1).padStart(2, '0')}</span><span>${project.tag}</span></div>
      <div class="archive-type" aria-hidden="true">${project.title.split(' ')[0]}</div>
      <div class="archive-card-body">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
      </div>
      <div class="archive-card-footer">
        <ul aria-label="Technologies">${project.tech.map((item) => `<li>${item}</li>`).join('')}</ul>
        ${project.links.length ? projectLinks(project.links, 'card-link') : '<span class="private-label">Private / offline</span>'}
      </div>
    </article>
  `).join('')
}

function renderCapabilities() {
  const tabs = document.querySelector('#capability-tabs')
  const panels = document.querySelector('#capability-panels')

  tabs.innerHTML = capabilityGroups.map((group, index) => `
    <button id="tab-${group.id}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="panel-${group.id}" tabindex="${index === 0 ? 0 : -1}">
      <span>${String(index + 1).padStart(2, '0')}</span>${group.label}
    </button>
  `).join('')

  panels.innerHTML = capabilityGroups.map((group, index) => `
    <section class="capability-panel" id="panel-${group.id}" role="tabpanel" aria-labelledby="tab-${group.id}" ${index === 0 ? '' : 'hidden'}>
      <p>${group.statement}</p>
      <ul>${group.skills.map((skill) => `<li>${skill}</li>`).join('')}</ul>
    </section>
  `).join('')

  const buttons = [...tabs.querySelectorAll('[role="tab"]')]
  const selectTab = (selected) => {
    buttons.forEach((button) => {
      const active = button === selected
      button.setAttribute('aria-selected', String(active))
      button.tabIndex = active ? 0 : -1
      document.querySelector(`#${button.getAttribute('aria-controls')}`).hidden = !active
    })
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => selectTab(button))
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
      event.preventDefault()
      let next = index
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length
      if (event.key === 'Home') next = 0
      if (event.key === 'End') next = buttons.length - 1
      selectTab(buttons[next])
      buttons[next].focus()
    })
  })
}

function initNavigation() {
  const header = document.querySelector('[data-header]')
  const menuButton = document.querySelector('.menu-button')
  const nav = document.querySelector('.site-nav')

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true'
    menuButton.setAttribute('aria-expanded', String(!open))
    nav.classList.toggle('is-open', !open)
    document.body.classList.toggle('menu-open', !open)
  })

  nav.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return
    menuButton.setAttribute('aria-expanded', 'false')
    nav.classList.remove('is-open')
    document.body.classList.remove('menu-open')
  })

  let previousY = window.scrollY
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY
    header.classList.toggle('is-compact', currentY > 32)
    header.classList.toggle('is-hidden', currentY > previousY && currentY > 500)
    previousY = currentY
  }, { passive: true })
}

function initContactForm() {
  emailjs.init('HOuzM-QQMxMXPbDeS')
  const form = document.querySelector('#contact-form')
  const status = document.querySelector('#form-status')
  const submit = form.querySelector('button[type="submit"]')
  const fields = {
    name: { input: form.elements.name, message: 'Add your name.' },
    email: { input: form.elements.email, message: 'Add a valid email address.' },
    message: { input: form.elements.message, message: 'Tell me a little about the project.' },
  }

  const validate = () => {
    let firstInvalid = null
    Object.entries(fields).forEach(([key, field]) => {
      const value = field.input.value.trim()
      const invalid = !value || (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      field.input.setAttribute('aria-invalid', String(invalid))
      document.querySelector(`#${key}-error`).textContent = invalid ? field.message : ''
      if (invalid && !firstInvalid) firstInvalid = field.input
    })
    firstInvalid?.focus()
    return !firstInvalid
  }

  Object.values(fields).forEach(({ input }) => input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid')
    document.querySelector(`#${input.id}-error`).textContent = ''
  }))

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    status.textContent = ''
    status.className = 'form-status'
    if (!validate()) return

    submit.disabled = true
    submit.querySelector('span').textContent = 'Sending…'
    try {
      await emailjs.send('service_d7lp08g', 'template_7q4ld1u', {
        from_name: fields.name.input.value.trim(),
        from_email: fields.email.input.value.trim(),
        message: fields.message.input.value.trim(),
      })
      form.reset()
      status.textContent = 'Message sent. I’ll get back to you soon.'
      status.classList.add('is-success')
    } catch {
      status.textContent = 'Could not send. Email me directly at hp@haportech.space.'
      status.classList.add('is-error')
    } finally {
      submit.disabled = false
      submit.querySelector('span').textContent = 'Send message'
    }
  })
}

renderFeaturedProjects()
renderArchive()
renderCapabilities()
initNavigation()
initContactForm()
initKineticReel()
