import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './login.less'
import view from './login.stache'

export const ViewModel = DefineMap.extend({

})

export default Component.extend({
  tag: 'login-modal',
  ViewModel,
  view
})
