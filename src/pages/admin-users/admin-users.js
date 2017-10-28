import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './admin-users.less'
import view from './admin-users.stache'
import User from '~/models/user'
import Pagination from '~/models/pagination'

export const ViewModel = DefineMap.extend({
  search: 'string',
  editUser: {
    Type: User
  },
  appState: {
    type: 'any'
  },
  kycUser: {
    Type: DefineMap
  },
  kycUserLoading: {
    value: false
  },
  loadingUsers: {
    value: true
  },
  rows: {
    Type: User.List
  },
  pagination: {
    Type: Pagination,
    value () {
      return {skip: 0, limit: 10}
    }
  },
  loadPage (params) {
    this.loadingUsers = true
    let pagination = this.pagination
    const query = {$skip: pagination.skip, $limit: pagination.limit}
    params = Object.assign({search: this.search}, params)
    if (params.search) {
      query['$search'] = params.search
    }
    User.getList(query)
			.then(users => {
  this.rows = users
  this.pagination.total = users.total
  setTimeout(() => this.loadingUsers = false, 25)
})
			.catch(err => {
  if (err.status === 401) this.appState.error401()
  else console.log(err)
})
  },
  openUser (editUser) {
  	this.editUser = editUser
    $('#EditUser').modal('show')
  },
  openUserKYC (editUser) {
    this.kycUserLoading = true
    this.editUser = editUser
  	editUser.getKyc()
			.then(data => {
  this.kycUser = data
  this.kycUserLoading = false

  $('#KYCUser').modal('show')
})
			.catch(err => {
  if (err.status === 401) this.appState.error401()
  else console.log(err)
})
  },
  deleteUser (delUser) {
    delUser.destroy()
  },
  doSearch () {
    if (!this.loadingUsers) {
      this.loadPage({search: this.search})
    }
  }
})

export default Component.extend({
  tag: 'admin-users',
  ViewModel,
  view,
  events: {
    inserted: function () {
      let pagination = this.viewModel.pagination
      User.getList({$skip: pagination.skip, $limit: pagination.limit})
				.then(users => {
  this.viewModel.rows = users
  this.viewModel.pagination.total = users.total
  setTimeout(() => this.viewModel.loadingUsers = false, 25)
})
				.catch(err => {
  if (err.status === 401) this.viewModel.appState.error401()
  else console.log(err)
})
    }
  }
})
