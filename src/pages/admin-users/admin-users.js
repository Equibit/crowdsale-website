import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './admin-users.less'
import view from './admin-users.stache'
import Pagination from '~/models/pagination'
import User from '~/models/user'
import Kyc from '~/models/kyc'

export const ViewModel = DefineMap.extend({
  search: 'string',
  editUser: {
    Type: User
  },
  session: {
    type: 'any'
  },
  kyc: {
    Type: Kyc
  },
  kycLoading: {
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
        setTimeout(() => { this.loadingUsers = false }, 25)
      })
      .catch(err => {
        if (err.status === 401) this.session.error401()
        else console.log(err)
      })
  },
  openUser (editUser) {
    this.editUser = editUser
    $('#EditUser').modal('show')
  },
  openUserKYC (editUser) {
    this.kycLoading = true
    this.editUser = editUser
    Kyc.get(editUser.kycId)
      .then(data => {
        this.kyc = data
        this.kycLoading = false

        $('#KYCUser').modal('show')
      })
      .catch(err => {
        if (err.status === 401) this.session.error401()
        else console.log(err)
      })
  },
  delUser: '*',
  openDeleteUser(delUser) {
    this.delUser = delUser
    $('#DeleteUser').modal('show')
  },
  userDeleted () {
    // Reload users and cleanup `delUser`.
    this.loadPage()
    this.delUser = null
  },
  doSearch () {
    if (!this.loadingUsers) {
      this.loadPage({search: this.search})
    }
  },
  openCreateNewUser () {
    $('#NewUser').modal('show')
  },
  createUser (user) {
    // this.loadPage()
    if (this.rows.indexOf(user) === -1) {
      this.rows.push(user)
    }
    $('#NewUser').modal('hide')
  },
  refresh () {
    this.loadPage()
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
          setTimeout(() => { this.viewModel.loadingUsers = false }, 25)
        })
        .catch(err => {
          if (err.status === 401) this.viewModel.session.error401()
          else console.log(err)
        })
    }
  }
})
