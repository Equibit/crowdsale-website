import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './ticket-details.less'
import view from './ticket-details.stache'
import Ticket from '~/models/admin-ticket'

export const ViewModel = DefineMap.extend({
	appState: {
		type: 'any'
	},
  linkSubject: 'string',
	loadingTicket: {
		value: true
	},
	ticketHistory: {
		type: 'any'
	}
})

export default Component.extend({
  tag: 'ticket-details',
  ViewModel,
  view,
	events: {
		inserted: function(){
			Ticket.get(this.viewModel.linkSubject)
				.then(ticket => {
					console.log(ticket)
					this.viewModel.ticketHistory = ticket.history
					setTimeout(() => this.viewModel.loadingTicket = false, 25)
				})
				.catch(err => {
					if (err.status === 401) this.viewModel.appState.error401()
					else console.log(err)
				})
		}
	}
})
