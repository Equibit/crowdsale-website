import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './forgot-password.less'
import view from './forgot-password.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the forgot-password-modal component'
  }
})

export default Component.extend({
  tag: 'forgot-password-modal',
  ViewModel,
  view
})
