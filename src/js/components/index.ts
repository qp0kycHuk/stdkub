import counter from './counter'
import datepicker from './datepicker'
import icon from './icon'
import menu from '@qpokychuk/wc-menu'

function registerAll() {
  counter.register()
  icon.register()
  menu.register()
  datepicker.register()
}

registerAll()
