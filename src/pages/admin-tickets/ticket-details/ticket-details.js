import $ from 'jquery'
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
  slug: 'string',
  loadingTicket: {
    value: true
  },
  ticketHistory: {
    type: 'any'
  },
  ticketData: {
    Type: Ticket
  },
  processing: 'boolean',
  disableForm: 'boolean',
  updateResponse () {
    this.processing = true
    this.disableForm = true
    this.quill.enable(false)
    this.ticketData.response = $('.ql-editor').html()
    if (this.ticketData.response.length > 1) {
      this.ticketData.save()
        .then(() => {
          this.processing = false
          this.disableForm = false
          let tempText = $('.ql-editor').html()
          // let tempText = ($('.ql-editor').text() + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ "<br />" +'$2')
          this.quill.enable(true)
          this.quill.setContents(JSON.parse('{"ops":[{"insert":"\\n"}]}'))
          this.ticketHistory.unshift({fromClient: 0, ticketDatetime: Date.now(), ticketText: tempText})
        })
    }
  }
})

export default Component.extend({
  tag: 'ticket-details',
  ViewModel,
  view,
  events: {
    inserted: function () {
      Ticket.get(this.viewModel.slug)
        .then(ticket => {
          this.viewModel.ticketHistory = ticket.history
          this.viewModel.ticketData = ticket
          setTimeout(() => { this.viewModel.loadingTicket = false }, 25)

          if (ticket.isOpen) {
            let toolbarOptions = [
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'image', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['link'],
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
