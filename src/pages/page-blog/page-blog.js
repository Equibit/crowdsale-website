import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './page-blog.less'
import view from './page-blog.stache'
import Blog from '~/models/blog'
import Pagination from '~/models/pagination'

export const ViewModel = DefineMap.extend({
  loadingBlog: {
    value: true
  },
  rows: {
    Type: Blog.List
  },
  pagination: {
    Type: Pagination,
    value () {
      return {skip: 0, limit: 10}
    }
  }
})

export default Component.extend({
  tag: 'page-blog',
  ViewModel,
  view,
  events: {
    inserted: function () {
      let pagination = this.viewModel.pagination
      Blog.getList({$skip: pagination.skip, $limit: pagination.limit})
				.then(blog => {
  this.viewModel.rows = blog
  this.viewModel.pagination.total = blog.total
  setTimeout(() => this.viewModel.loadingBlog = false, 25)
})
				.catch(err => console.log(err))
    }
  }
})
