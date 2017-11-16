import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './change-password.less'
import view from './change-password.stache'
import feathersClient from '~/models/feathers-client'
import validate from '~/utils/validators'
import User from '~/models/user'

export const ViewModel = DefineMap.extend({
  currentUser: {
    Type: User
  },
  session: {
    type: 'any'
  },
  changeError: 'boolean',
  processing: 'boolean',
  newPasswordError: 'string',
  disableForm: {
    type: 'boolean',
    value: false
  },
  clearPassword: 'string',
  oldPassword: 'string',
  newPassword: {
    type: 'string',
    set (value) {
      this.newPasswordError = validate.password(value, {allowEmpty: 1})
      return value
    }
  },
  oldPasswordVisible: 'boolean',
  newPasswordVisible: 'boolean',
  hasErrors: {
    get () {
      this.newPasswordError = validate.password(this.newPassword, {allowEmpty: 0})
      return this.newPasswordError
    }
  },
  updatePassword (el) {
    this.newPassword = el.value
  },
  toggleTypeNew () {
    this.newPasswordVisible = !this.newPasswordVisible
  },
  toggleTypeOld () {
    this.oldPasswordVisible = !this.oldPasswordVisible
  },
  handleChangePassword (ev, newPassword, oldPassword) {
    ev.preventDefault()
    if (this.hasErrors) return false
    this.changeError = false
    this.processing = true
    this.disableForm = true

    this.currentUser = feathersClient.get('user')
    this.currentUser.changePassword(newPassword, oldPassword)
      .then(() => {
        this.clearForm()
      })
      .catch(err => {
        this.disableForm = false
        this.processing = false
        this.changeError = true
        if (err.status === 401) this.session.error401()
        else console.log(err)
      })
  },
  clearForm () {
    this.processing = false
    this.changeError = false
    this.disableForm = false
    this.clearPassword = null
    this.oldPassword = null
    this.newPassword = null
    this.newPasswordError = null

    $('#change-password-modal').modal('hide')
  }
})

export default Component.extend({
  tag: 'change-password-modal',
  ViewModel,
  view
})
