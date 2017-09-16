import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-universe.less';
import view from './page-universe.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-universe component'
  }
});

export default Component.extend({
  tag: 'page-universe',
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
});