import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './admin-faqs.less'
import view from './admin-faqs.stache'
import Pagination from '~/models/pagination'
import Faq from '~/models/faq'

export const ViewModel = DefineMap.extend({
  session: {
    type: 'any'
  },
  loadingFAQs: {
    value: true
  },
  rows: {
    Type: Faq.List
  },
  pagination: {
    Type: Pagination,
    value () {
      return {skip: 0, limit: 10}
    }
  },
  loadPage () {
    this.loadingBlog = true
    let pagination = this.pagination
    Faq.getList({$skip: pagination.skip, $limit: pagination.limit})
      .then(faqs => {
        this.rows = faqs
        this.pagination.total = faqs.total
        setTimeout(() => { this.loadingFAQs = false }, 25)
      })
      .catch(err => {
        if (err.status === 401) this.session.error401()
        else console.log(err)
      })
  }
})

export default Component.extend({
  tag: 'admin-faqs',
  ViewModel,
  view,
  events: {
    inserted: function () {
      let pagination = this.viewModel.pagination
      Faq.getList({$skip: pagination.skip, $limit: pagination.limit})
        .then(faqs => {
          this.viewModel.rows = faqs
          this.viewModel.pagination.total = faqs.total
          setTimeout(() => { this.viewModel.loadingFAQs = false }, 25)
        })
        .catch(err => {
          if (err.status === 401) this.viewModel.session.error401()
          else console.log(err)
        })
    }
  }
})
