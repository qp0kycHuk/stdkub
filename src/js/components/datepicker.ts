import AirDatepicker from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'

function initDatePicker() {
  // @ts-ignore
  const target = this as Datepicker

  const minDateAttr = target.getAttribute('mindate') || ''
  const minDate = isNaN(Date.parse(minDateAttr)) ? false : Date.parse(minDateAttr)
  const maxDateAttr = target.getAttribute('maxdate') || ''
  const maxDate = isNaN(Date.parse(maxDateAttr)) ? false : Date.parse(maxDateAttr)

  const dateFormat = target.getAttribute('dateformat') || 'dd.MM.yyyy'

  const selectedDates = (target.getAttribute('selecteddates') || target.value || target.getAttribute('value') || '')
    .split(',')
    .map(Date.parse)
    .filter((value) => !isNaN(value))

  target.datePicker = new AirDatepicker(target, {
    locale: localeRu,
    isMobile: true,
    autoClose: true,
    minDate,
    maxDate,
    dateFormat,
    selectedDates,
    toggleSelected: false,
  })
}

class Datepicker extends HTMLInputElement {
  datePicker: AirDatepicker | null = null

  connectedCallback() {
    initDatePicker.call(this)
  }

  disconnectedCallback() {
    this.datePicker?.destroy()
  }
}

function register() {
  customElements.define('air-datepicker', Datepicker, { extends: 'input' })
  document.addEventListener('DOMContentLoaded', () => {
    polyfill(document.body)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((record) => {
        polyfill(record.target as HTMLElement)
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
  // polyfill(document.body)
}

function polyfill(container: HTMLElement) {
  const targets = Array.from(container.querySelectorAll<Datepicker>('[is="air-datepicker"]'))

  targets.forEach((target) => {
    if (target.datePicker) {
      return
    }

    initDatePicker.call(target)
  })
}

export default { register }
