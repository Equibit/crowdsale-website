import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './set-password.less'
import view from './set-password.stache'

export const ViewModel = DefineMap.extend({

})

export default Component.extend({
  tag: 'set-password-modal',
  ViewModel,
  view
})
