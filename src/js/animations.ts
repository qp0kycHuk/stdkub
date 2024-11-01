import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const gsapAnimation: Record<string, any> = {
  fadeInLeft: {
    from: { x: '-75', opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fadeInRight: {
    from: { x: '75', opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fadeInUp: {
    from: { y: '75', opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fadeInDown: {
    from: { y: '-75', opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { scale: 1.5 },
    to: { scale: 1 },
  },
}

function init() {
  gsap.registerPlugin(ScrollTrigger)

  scrollInit()

  document.addEventListener('toggleopen', () => {
    ScrollTrigger.refresh()
  })

  document.addEventListener('toggleclose', () => {
    ScrollTrigger.refresh()
  })

  // parallax
  {
    const items = document.querySelectorAll('[data-parallax]')

    items.forEach((item) => {
      const value = +(item.getAttribute('data-parallax') || 200)

      gsap.fromTo(
        item,
        { y: value / 2 },
        {
          y: -value / 2,
          scrollTrigger: {
            trigger: item.closest('section'),
            scrub: 2,
          },
        }
      )
    })
  }
}

function scrollInit() {
  const scrollElements = document.querySelectorAll('[data-animation]')

  scrollElements.forEach((element) => {
    const key = element.getAttribute('data-animation')
    const duration = element.getAttribute('data-duration') || 1
    const end = element.getAttribute('data-end') || 'bottom -10%'
    const start = element.getAttribute('data-start') || 'top 110%'
    const delay = 0.25 + parseFloat(element.getAttribute('data-delay') || '0')
    const actions = element.getAttribute('data-actions') || 'play reverse play reverse'

    const animation = gsapAnimation[key || '']

    if (!animation) {
      return
    }

    const instance = gsap.fromTo(element, animation.from, {
      ...animation.to,
      duration,
      delay,
      ease: 'elastic.out(1,1)',
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        toggleActions: actions,

        // scrub: true,
        // markers: true,
        // id: "scrub"
      },
    })

    instance.then(() => {
      gsap.set(element, {
        transform: 'none',
      })
    })
  })
}

export default { init }
