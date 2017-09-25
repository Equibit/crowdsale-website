import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './ticket-details.less'
import view from './ticket-details.stache'
import Ticket from '~/models/admin-ticket'
import Quill from 'quill'

export const ViewModel = DefineMap.extend({
	appState: {
		type: 'any'
	},
	quill: {
		type: 'any'
	},
  linkSubject: 'string',
	loadingTicket: {
		value: true
	},
	ticketHistory: {
		type: 'any'
	},
	ticketData: {
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
					this.viewModel.ticketHistory = ticket.history
					this.viewModel.ticketData = ticket.ticket
					setTimeout(() => this.viewModel.loadingTicket = false, 25)

					if (ticket.ticket.isOpen) {
						let toolbarOptions = [
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
							['bold', 'italic', 'underline', 'strike'],
							['blockquote', 'image', 'code-block'],
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							[{ 'script': 'sub'}, { 'script': 'super' }],
							[{ 'indent': '-1'}, { 'indent': '+1' }],
							[{ 'color': [] }, { 'background': [] }],
							[{ 'align': [] }],
							['clean']
						]

						this.viewModel.quill = new Quill('#ticket-response', {
							modules: {
								toolbar: toolbarOptions
							},
							theme: 'snow'
						})
					}

				})
				.catch(err => {
					if (err.status === 401) this.viewModel.appState.error401()
					else console.log(err)
				})
		}
	}
})
