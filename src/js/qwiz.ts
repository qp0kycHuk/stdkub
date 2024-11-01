import type Swiper from 'swiper'

export class Qwiz {
  $qwiz: Element
  qwizSlider: Swiper

  constructor($qwiz: Element, qwizSlider: Swiper) {
    this.$qwiz = $qwiz
    this.qwizSlider = qwizSlider
  }

  init() {
    this.initListeners()
    this.checkForm()
  }

  initListeners() {
    this.$qwiz.addEventListener('input', this.checkForm.bind(this))
    this.$qwiz.addEventListener('input', this.checkCondition.bind(this))
    this.qwizSlider.on('slideChange', this.checkForm.bind(this))
  }

  checkForm() {
    const activeForm = this.qwizSlider.slides[this.qwizSlider.activeIndex]

    this.$qwiz.classList.toggle('last', this.qwizSlider.isEnd)
    this.$qwiz.classList.toggle('first', this.qwizSlider.isBeginning)

    const inputs = [
      ...Array.from(activeForm.querySelectorAll('input')),
      ...Array.from(activeForm.querySelectorAll('textarea')),
      ...Array.from(activeForm.querySelectorAll('select')),
    ]

    let isReady = false

    for (const i in inputs) {
      if (!Object.hasOwnProperty.call(inputs, i)) continue
      if (inputs[i].hidden || inputs[i].type == 'hidden') continue

      if (inputs[i].type == 'checkbox' || inputs[i].type == 'radio') {
        if ((inputs[i] as HTMLInputElement).checked) {
          isReady = true
        }

        continue
      }

      if (inputs[i].value != '') {
        isReady = true
      }

      if (inputs[i].value == '' && inputs[i].required) {
        isReady = false
        break
      }
    }

    if (!isReady) {
      this.$qwiz.classList.add('stopped')
    } else {
      this.$qwiz.classList.remove('stopped')
    }
  }

  checkCondition(event: Event) {
    const target = event.target as HTMLInputElement

    if (target.getAttribute('data-condition-target') == null) return

    const condition = target.getAttribute('data-condition-target')

    let isReady = false

    if (target.type == 'checkbox' || target.type == 'radio') {
      if (target.checked) {
        isReady = true
      }
    } else if (target.value != '') {
      isReady = true
    }

    if (isReady) {
      this.$qwiz.classList.add('condition-' + condition)
    } else {
      this.$qwiz.classList.remove('condition-' + condition)
    }
  }
}
