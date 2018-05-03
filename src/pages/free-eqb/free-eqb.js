import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './free-eqb.less'
import view from './free-eqb.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the free-eqb component'
  }
})

export default Component.extend({
  tag: 'free-eqb',
  ViewModel,
  view
})
