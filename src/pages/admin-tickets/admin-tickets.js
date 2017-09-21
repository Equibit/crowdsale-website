import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './admin-tickets.less'
import view from './admin-tickets.stache'
import Ticket from '~/models/admin-ticket'

export const ViewModel = DefineMap.extend({
	search: 'string',
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
		}))({skip: 0, limit: 50})
	},
	loadPage (params) {
		this.loadingTickets = true
		let pagination = this.pagination
		const query = {$skip: pagination.skip, $limit: pagination.limit}
		params = Object.assign({search: this.search}, params)
		if (params.search) {
			query['$search'] = params.search
		}
		Ticket.getList(query)
			.then(tickets => {
				this.rows = tickets
				this.pagination.total = tickets.total
				setTimeout(() => this.loadingTickets = false, 25)
			})
			.catch(err => {
				if (err.status === 401) this.appState.error401()
				else console.log(err)
			})
	},
	doSearch() {
		if (!this.loadingTickets) {
			this.loadPage({search: this.search})
		}
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
