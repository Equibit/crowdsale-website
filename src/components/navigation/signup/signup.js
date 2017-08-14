import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './signup.less'
import view from './signup.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the signup-modal component'
  }
})

export default Component.extend({
  tag: 'signup-modal',
  ViewModel,
  view
})
