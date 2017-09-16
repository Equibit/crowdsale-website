import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-projects.less'
import view from './page-projects.stache'

export const ViewModel = DefineMap.extend({
})

export default Component.extend({
  tag: 'page-projects',
  ViewModel,
  view,
	events: {
		inserted: function() {
			$('a').click(function() {
				let target = $(this.hash)

				if (target.length) {
					if ($(this).hasClass('ignore-href')) return true
					if ($('.navbar-toggle').is(':visible') && $('.navbar-collapse').hasClass('in')) $('.navbar-toggle').trigger('click')
					$('html, body').stop()
					$('html,body').animate({
						scrollTop: target.offset().top - 90
					}, 1000)
					return false
				}
			})
		},
		remove: function() {
			$('a').off('click')
		}
	}
})
