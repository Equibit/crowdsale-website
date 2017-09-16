import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './admin-tickets.less'
import view from './admin-tickets.stache'
import Ticket from '~/models/admin-ticket'

export const ViewModel = DefineMap.extend({
	appState: {
		type: 'any'
	},
	loadingTickets: {
		value: true
	},
	rows: {
		Type: Ticket.List
	},
	pagination: {
		value: new (DefineMap.extend({
			skip: 'number',
			limit: 'number',
			total: 'number'
		}))({skip: 0, limit: 30})
	},
	loadPage () {
		this.loadingTickets = true
		let pagination = this.pagination
		Ticket.getList({$skip: pagination.skip, $limit: pagination.limit})
			.then(tickets => {
				this.rows = tickets
				this.pagination.total = tickets.total
				setTimeout(() => this.loadingTickets = false, 25)
			})
			.catch(err => {
				if (err.status === 401) this.appState.error401()
				else console.log(err)
			})
	}
})

export default Component.extend({
	tag: 'admin-tickets',
	ViewModel,
	view,
	events: {
		inserted: function(){
			let pagination = this.viewModel.pagination
			Ticket.getList({$skip: pagination.skip, $limit: pagination.limit})
				.then(tickets => {
					this.viewModel.rows = tickets
					this.viewModel.pagination.total = tickets.total
					setTimeout(() => this.viewModel.loadingTickets = false, 25)
				})
				.catch(err => {
					if (err.status === 401) this.viewModel.appState.error401()
					else console.log(err)
				})
		}
	}
})
