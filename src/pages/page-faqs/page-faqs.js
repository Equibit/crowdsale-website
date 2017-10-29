import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-faqs.less'
import view from './page-faqs.stache'
import FAQs from '~/models/faqs'
import '~/models/fixtures/faqs'

export const ViewModel = DefineMap.extend({
  loadingFAQs: {
    value: true
  },
  rows: {
    Type: FAQs.List
  },
  filteredRows: {
    Type: FAQs.List
  },
  filterBy: {
    type: 'string'
  },
  hasCategories: {
    value () {
      return this.rows.filter(item => item.category !== '').length
    }
  },
  categories: {
    value () {
      return this.rows.reduce((list, item) => {
        if (item.category !== '' && !list.includes(item.category)) list.push(item.category)
        return list
      }, [])
    }
  },
  runFilter () {
    if (this.filterBy !== '') {
      this.filteredRows = this.rows.filter(item => item.category === this.filterBy)
    } else {
      this.filteredRows = this.rows
    }
  }
})

export default Component.extend({
  tag: 'page-faqs',
  ViewModel,
  view,
  events: {
    inserted: function () {
      FAQs.getList()
        .then(faqs => {
          this.viewModel.rows = faqs
          this.viewModel.filteredRows = faqs
          setTimeout(() => { this.viewModel.loadingFAQs = false }, 25)
        })
        .catch(err => console.log(err))
    }
  }
})
