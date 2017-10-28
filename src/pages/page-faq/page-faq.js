import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './page-faq.less'
import view from './page-faq.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-faq component'
  }
})

export default Component.extend({
  tag: 'page-faq',
  ViewModel,
  view
})
