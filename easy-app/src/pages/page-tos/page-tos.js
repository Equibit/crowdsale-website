import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-tos.less'
import view from './page-tos.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-tos component'
  }
})

export default Component.extend({
  tag: 'page-tos',
  ViewModel,
  view
})
