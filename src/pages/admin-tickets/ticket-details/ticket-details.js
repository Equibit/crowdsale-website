import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './ticket-details.less'
import view from './ticket-details.stache'

export const ViewModel = DefineMap.extend({
	appState: {
		type: 'any'
	},
  linkSubject: 'string'
})

export default Component.extend({
  tag: 'ticket-details',
  ViewModel,
  view
})
