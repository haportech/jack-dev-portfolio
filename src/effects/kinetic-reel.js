import { animate, inView, scroll, stagger } from 'motion'

export function initKineticReel() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cleanups = []

  if (reducedMotion) return () => {}

  animate('.site-header, .availability', { opacity: [0, 1], transform: ['translateY(-18px)', 'translateY(0)'] }, { duration: .65, ease: [.22, 1, .36, 1] })
  animate('.hero-title > span', { opacity: [0, 1], transform: ['translateY(44px)', 'translateY(0)'] }, { delay: stagger(.1), duration: .9, ease: [.22, 1, .36, 1] })
  animate('.hero-portrait-wrap', { opacity: [0, 1], transform: ['translateX(-50%) translateY(42px) scale(.96)', 'translateX(-50%) translateY(0) scale(1)'] }, { delay: .22, duration: .9, ease: [.22, 1, .36, 1] })
  animate('.hero-bottom', { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] }, { delay: .45, duration: .7, ease: [.22, 1, .36, 1] })

  cleanups.push(scroll(animate('.hero-portrait-wrap', {
    transform: ['translateX(-50%) translateY(0) scale(1)', 'translateX(-50%) translateY(11vh) scale(.88)'],
  }, { ease: 'linear' }), { target: document.querySelector('.hero'), offset: ['start start', 'end start'] }))

  cleanups.push(scroll(animate('.hero-jack', {
    transform: ['translateX(0)', 'translateX(-8vw)'],
  }, { ease: 'linear' }), { target: document.querySelector('.hero'), offset: ['start start', 'end start'] }))

  cleanups.push(scroll(animate('.hero-dev', {
    transform: ['translateX(0)', 'translateX(8vw)'],
  }, { ease: 'linear' }), { target: document.querySelector('.hero'), offset: ['start start', 'end start'] }))

  document.querySelectorAll('.reel-scene').forEach((scene) => {
    const stage = scene.querySelector('.reel-stage')
    const media = scene.querySelector('.project-media')
    const copy = scene.querySelector('.scene-copy')
    const number = scene.querySelector('.scene-number')
    const detail = scene.querySelector('.project-detail')
    const meta = scene.querySelector('.project-meta')
    const video = scene.querySelector('video')

    cleanups.push(scroll(animate(media, {
      transform: ['translate3d(12vw, 10vh, 0) scale(.76) rotate(3deg)', 'translate3d(0, 0, 0) scale(1) rotate(0deg)', 'translate3d(-7vw, -8vh, 0) scale(.88) rotate(-2deg)'],
      opacity: [.25, 1, .6],
    }, { ease: 'linear' }), { target: scene, offset: ['start end', 'end start'] }))

    cleanups.push(scroll(animate(copy, {
      transform: ['translate3d(-5vw, 8vh, 0)', 'translate3d(0, 0, 0)', 'translate3d(0, -9vh, 0)'],
      opacity: [.25, 1, .25],
    }, { ease: 'linear' }), { target: scene, offset: ['start end', 'end start'] }))

    cleanups.push(scroll(animate(number, {
      transform: ['translateX(10vw) rotate(4deg)', 'translateX(0) rotate(0deg)', 'translateX(-6vw) rotate(-3deg)'],
    }, { ease: 'linear' }), { target: scene, offset: ['start end', 'end start'] }))

    cleanups.push(scroll(animate(detail, {
      transform: ['translate3d(4rem, 4rem, 0) rotate(5deg)', 'translate3d(0, 0, 0) rotate(0deg)', 'translate3d(-2rem, -2rem, 0) rotate(-3deg)'],
    }, { ease: 'linear' }), { target: scene, offset: ['start end', 'end start'] }))

    cleanups.push(scroll(animate(meta, { opacity: [.15, 1, .3] }, { ease: 'linear' }), { target: scene, offset: ['start end', 'end start'] }))

    cleanups.push(inView(stage, () => {
      video.play().catch(() => {})
      return () => video.pause()
    }, { amount: .45 }))
  })

  document.querySelectorAll('.identity-title, .identity-copy, .capabilities-heading, .capabilities-body, .principles > h2, .principle-list article, .contact-heading, .contact-form').forEach((element) => {
    cleanups.push(inView(element, () => {
      animate(element, { opacity: [0, 1], transform: ['translateY(32px)', 'translateY(0)'] }, { duration: .7, ease: [.22, 1, .36, 1] })
    }, { amount: .18, margin: '0px 0px -8% 0px' }))
  })

  let archiveCleanup = () => {}
  let resizeTimer
  const setupArchive = () => {
    archiveCleanup()
    const archive = document.querySelector('.archive')
    const header = archive.querySelector('.archive-header')
    const track = archive.querySelector('.project-track')

    if (window.innerWidth <= 800) {
      archive.style.removeProperty('height')
      track.style.removeProperty('transform')
      archiveCleanup = () => {}
      return
    }

    const edge = Number.parseFloat(getComputedStyle(header).paddingLeft) || 0
    const travel = Math.max(0, track.scrollWidth - window.innerWidth + edge)
    archive.style.height = `${header.offsetHeight + window.innerHeight + travel}px`
    archiveCleanup = scroll(animate(track, {
      transform: ['translate3d(0, 0, 0)', `translate3d(-${travel}px, 0, 0)`],
    }, { ease: 'linear' }), {
      target: archive,
      offset: [`${header.offsetHeight}px start`, 'end end'],
    })
  }

  setupArchive()
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(setupArchive, 180)
  })

  return () => {
    archiveCleanup()
    cleanups.forEach((cleanup) => cleanup?.())
  }
}
