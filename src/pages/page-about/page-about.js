import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-about.less'
import view from './page-about.stache'
import $ from 'jquery'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-about component'
  }
})

export default Component.extend({
  tag: 'page-about',
  ViewModel,
  view,
  events: {
    inserted: function () {
      $('.setsize').each(function () {
        $(this).height($(this).width())
      })

      $(window).on('resize', function () {
        $('.setsize').each(function () {
          $(this).height($(this).width())
        })
      })
    }
  }
})
