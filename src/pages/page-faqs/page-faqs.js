import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-faqs.less'
import view from './page-faqs.stache'
import Pagination from '~/models/pagination'
import FAQs from '~/models/faqs'
import '~/models/fixtures/faqs'

export const ViewModel = DefineMap.extend({
  loadingFAQs: {
    value: true
  },
  rows: {
    Type: FAQs.List
  },
  pagination: {
    Type: Pagination,
    value () {
      return {skip: 0, limit: 10}
    }
  }
})

export default Component.extend({
  tag: 'page-faqs',
  ViewModel,
  view,
  events: {
    inserted: function () {
      let pagination = this.viewModel.pagination
      FAQs.getList({$skip: pagination.skip, $limit: pagination.limit})
        .then(faqs => {
          this.viewModel.rows = faqs
          this.viewModel.pagination.total = faqs.total
          setTimeout(() => { this.viewModel.loadingFAQs = false }, 25)
        })
        .catch(err => console.log(err))
    }
  }
})
