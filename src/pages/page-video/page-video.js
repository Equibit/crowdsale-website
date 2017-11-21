import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './page-video.less'
import view from './page-video.stache'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-video component'
  }
})

export default Component.extend({
  tag: 'page-video',
  ViewModel,
  view
})
