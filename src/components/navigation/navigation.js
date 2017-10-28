import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './navigation.less'
import view from './navigation.stache'
import route from 'can-route'
import 'can-route-pushstate'

export const ViewModel = DefineMap.extend({
  listenerAdded: {
    value: false
  },
  appState: {
    type: 'any'
  },
  page: {
    type: 'any'
  },
  closeMenu () {
    if ($('.navbar-toggle').is(':visible') && $('.navbar-collapse').hasClass('in')) {
      $('.navbar-toggle').trigger('click')
      setTimeout(() => $('html, body').animate({scrollTop: 0}, 'fast'), 25)
    }
  },
  logout () {
    this.closeMenu()
    this.appState.logout()
    route.data.set({page: 'home'}, true)
  }
})

export default Component.extend({
  tag: 'navigation-bar',
  ViewModel,
  view,
  events: {
    inserted: function () {
      if (!this.viewModel.listenerAdded) {
        this.viewModel.listenerAdded = true

        $('.modal').on('shown.bs.modal', function () {
          $(this).find('[autofocus]').focus()
        })
      }
    }
  }
})
