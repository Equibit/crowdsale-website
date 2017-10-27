import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './admin-tickets.less'
import view from './admin-tickets.stache'
import Ticket from '~/models/admin-ticket'
import Pagination from '~/models/pagination'

export const ViewModel = DefineMap.extend({
	search: 'string',
	filter: 'string',
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
    Type: Pagination,
    value () {
      return {skip: 0, limit: 10}
    }
  },
	loadPage (params) {
		this.loadingTickets = true
		let pagination = this.pagination
		const query = {$skip: pagination.skip, $limit: pagination.limit}
		params = Object.assign({search: this.search, filter: this.filter}, params)
		if (params.search) {
			query['$search'] = params.search
		}
		if (params.filter) {
			query['$filter'] = params.filter
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
			this.filter = null
			this.loadPage({search: this.search})
		}
	},
	doFilter(filter) {
		if (!this.loadingTickets) {
			this.filter = filter
			this.loadPage({search: this.search, filter: this.filter})
		}
	},
	closeTicket(ticket) {
		ticket.isOpen = false;
		ticket.save()
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
