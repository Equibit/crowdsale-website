import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-privacy.less'
import view from './page-privacy.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-privacy component'
  }
})

export default Component.extend({
  tag: 'page-privacy',
  ViewModel,
  view
})
