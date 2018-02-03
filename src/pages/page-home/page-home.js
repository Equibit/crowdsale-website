import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-home.less'
import view from './page-home.stache'
import $ from 'jquery'

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-home component'
  },
  showComingSoon: 'boolean',
  buy () {
    $('#coming-soon-modal').modal('show')
  },
  close () {
    $('#coming-soon-modal').modal('hide')
  }
})

export default Component.extend({
  tag: 'page-home',
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
