import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './navigation.less'
import view from './navigation.stache'
import 'can-route-pushstate'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the navigation-bar component'
  }
})

export default Component.extend({
  tag: 'navigation-bar',
  ViewModel,
  view
})