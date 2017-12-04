import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './page-mining.less'
import view from './page-mining.stache'
import $ from 'jquery'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-mining component'
  }
})

export default Component.extend({
  tag: 'page-mining',
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
