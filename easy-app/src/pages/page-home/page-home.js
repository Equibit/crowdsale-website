import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-home.less'
import view from './page-home.stache'
import $ from 'jquery'
import 'fullpage.js'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-home component'
  }
})

export default Component.extend({
  tag: 'page-home',
  ViewModel,
  view,
  events: {
    inserted() {
      console.log("inserted")
      $('#fullpage').fullpage()
			$.fn.fullpage.reBuild();
    },
    remove() {
      console.log("removed")
			$.fn.fullpage.destroy('all');
    }
  }
})
