import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './page-overview.less'
import view from './page-overview.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-overview component'
  },
  question: {
    type: 'number',
    value: 1
  },
  changeQ (num) {
    this.question = num
  }
})

export default Component.extend({
  tag: 'page-overview',
  ViewModel,
  view
})
