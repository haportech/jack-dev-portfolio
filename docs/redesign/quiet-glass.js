import { animate, scroll, stagger } from 'motion'
import { featuredProjects, projectArchive } from '/src/data/portfolio.js'

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
const dialog = document.querySelector('#case-dialog')
const tabs = document.querySelector('#project-tabs')
const panels = document.querySelector('#project-panels')
let selectedIndex = 0
let panelAnimation
let stopParallax
const indicator = document.createElement('span')
indicator.className = 'selection-indicator'
indicator.setAttribute('aria-hidden', 'true')

function makeLink(link) {
  const anchor = document.createElement('a')
  anchor.textContent = link.label
  anchor.href = link.url
  anchor.target = '_blank'
  anchor.rel = 'noopener noreferrer'
  return anchor
}

function openCase(project) {
  document.querySelector('#case-title').textContent = project.title
  document.querySelector('#case-description').textContent = project.description
  const facts = document.querySelector('#case-facts')
  facts.replaceChildren()
  for (const [label, value] of [['My role', project.role], ['Scope', project.scale], ['Outcome', project.outcome]]) {
    const row = document.createElement('div')
    const term = document.createElement('dt')
    const description = document.createElement('dd')
    term.textContent = label
    description.textContent = value
    row.append(term, description)
    facts.append(row)
  }
  const image = document.querySelector('#case-image')
  image.src = project.detail
  image.alt = `${project.title} detail view`
  document.querySelector('#case-links').replaceChildren(...project.links.map(makeLink))
  dialog.showModal()
  dialog.scrollTop = 0
  if (!motionPreference.matches) animate(dialog, { opacity: [0, 1], y: [18, 0] }, { duration: .3, ease: 'easeOut' })
}

featuredProjects.forEach((project, index) => {
  const tab = document.createElement('button')
  tab.type = 'button'
  tab.id = `project-tab-${project.id}`
  tab.setAttribute('role', 'tab')
  tab.setAttribute('aria-controls', `project-panel-${project.id}`)
  tab.textContent = project.title
  tab.addEventListener('click', () => selectProject(index))
  tab.addEventListener('keydown', event => {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % featuredProjects.length
    if (event.key === 'ArrowLeft') next = (index + featuredProjects.length - 1) % featuredProjects.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = featuredProjects.length - 1
    if (next !== undefined) {
      event.preventDefault()
      selectProject(next)
      tabs.children[next].focus()
    }
  })
  tabs.append(tab)

  const panel = document.createElement('div')
  panel.id = `project-panel-${project.id}`
  panel.className = 'project-panel'
  panel.setAttribute('role', 'tabpanel')
  panel.setAttribute('aria-labelledby', tab.id)
  panel.innerHTML = '<div class="project-viewport"><img width="1440" height="900"><video controls playsinline preload="none" hidden></video><p class="media-status" role="status" hidden></p></div><div class="project-summary"><div><h3></h3><p></p></div><div class="project-actions"><button class="demo-button" type="button" aria-pressed="false">Play project demo</button><button class="case-button" type="button">Inside the project</button></div></div>'
  const image = panel.querySelector('img')
  image.src = project.poster
  image.alt = project.alt
  panel.querySelector('h3').textContent = project.title
  panel.querySelector('.project-summary p').textContent = project.statement
  const video = panel.querySelector('video')
  video.src = project.video
  video.poster = project.poster
  video.setAttribute('aria-label', `${project.title} walkthrough`)
  const demoButton = panel.querySelector('.demo-button')
  const status = panel.querySelector('.media-status')
  function showMediaError() {
    video.pause()
    video.hidden = true
    image.hidden = false
    demoButton.textContent = 'Replay project demo'
    demoButton.setAttribute('aria-pressed', 'false')
    status.textContent = 'The demo could not play. You can still open the case study or try again.'
    status.hidden = false
  }
  demoButton.addEventListener('click', async () => {
    if (!video.hidden) {
      video.pause()
      video.hidden = true
      image.hidden = false
      demoButton.textContent = 'Play project demo'
      demoButton.setAttribute('aria-pressed', 'false')
      return
    }
    status.hidden = true
    image.hidden = true
    video.hidden = false
    demoButton.textContent = 'Show screenshot'
    demoButton.setAttribute('aria-pressed', 'true')
    try {
      await video.play()
      if (panel.hidden) video.pause()
    } catch {
      if (!video.hidden && !panel.hidden) showMediaError()
    }
  })
  video.addEventListener('error', showMediaError)
  panel.querySelector('.case-button').addEventListener('click', () => {
    video.pause()
    openCase(project)
  })
  panels.append(panel)
})

function selectProject(index) {
  panelAnimation?.stop()
  const changed = selectedIndex !== index
  selectedIndex = index
  Array.from(tabs.querySelectorAll('[role="tab"]')).forEach((tab, position) => {
    tab.setAttribute('aria-selected', String(position === index))
    tab.tabIndex = position === index ? 0 : -1
    const panel = panels.children[position]
    panel.hidden = position !== index
    if (panel.hidden) panel.querySelector('video').pause()
  })
  document.querySelector('#project-counter').textContent = `${index + 1} of ${featuredProjects.length}`
  tabs.style.setProperty('--selected-index', index)
  if (changed && !motionPreference.matches) panelAnimation = animate(panels.children[index], { opacity: [0, 1], y: [10, 0] }, { duration: .32, ease: 'easeOut' })
}
selectProject(0)
tabs.append(indicator)

const themeToggle = document.querySelector('#theme-toggle')
themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark'
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  themeToggle.setAttribute('aria-pressed', String(dark))
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`)
})

document.querySelector('#close-case').addEventListener('click', () => dialog.close())
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return
  const bounds = dialog.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close()
})

projectArchive.forEach((project, index) => {
  const row = document.createElement('article')
  row.className = 'archive-row'
  const title = document.createElement('h3')
  title.textContent = project.title
  const tag = document.createElement('p')
  tag.textContent = project.tag
  const links = document.createElement('div')
  links.className = 'archive-links'
  if (project.links.length) links.append(...project.links.map(makeLink))
  else {
    links.className = 'private-project'
    links.textContent = 'No public link'
  }
  row.append(title, tag, links)
  document.querySelector(index < 3 ? '#archive-preview' : '#archive-rest').append(row)
})

function configureParallax() {
  stopParallax?.()
  const stage = document.querySelector('.project-shell')
  stage.style.transform = ''
  if (!motionPreference.matches && window.matchMedia('(min-width: 1001px) and (pointer: fine)').matches) {
    stopParallax = scroll(animate(stage, { y: [12, -12] }, { ease: 'linear' }), { target: document.querySelector('#project-stage'), offset: ['start end', 'end start'] })
  }
}
configureParallax()
window.matchMedia('(min-width: 1001px) and (pointer: fine)').addEventListener('change', configureParallax)
motionPreference.addEventListener('change', () => {
  panelAnimation?.complete()
  document.querySelectorAll('.entrance').forEach(element => element.getAnimations().forEach(animation => animation.finish()))
  configureParallax()
})
if (!motionPreference.matches) animate('.entrance', { opacity: [0, 1], y: [16, 0] }, { duration: .65, delay: stagger(.07), ease: [.22, 1, .36, 1] })
