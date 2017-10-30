import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './forgot-password.less'
import view from './forgot-password.stache'
import validate from '~/utils/validators'
import User from '~/models/user'
import '~/models/fixtures/users'

export const ViewModel = DefineMap.extend({
  isSent: 'boolean',
  forgotError: 'boolean',
  emailError: 'string',
  processing: 'boolean',
  disableForm: {
    type: 'boolean',
    value: false
  },
  email: {
    type: 'string',
    set (value) {
      this.emailError = validate.email(value, {allowEmpty: 1})
      return value
    }
  },
  handleForget (ev, email) {
    ev.preventDefault()
    if (this.emailError) return false
    this.forgotError = false
    this.processing = true
    this.disableForm = true

    let newUser = new User()
    newUser.forgotPassword(email)
      .then(() => {
        this.clearForm()
      })
      .catch(() => {
        this.disableForm = false
        this.processing = false
        this.forgotError = true
      })
  },
  clearForm () {
    this.isSent = false
    this.processing = false
    this.forgotError = false
    this.disableForm = false
    this.email = null

    $('#forgot-password-modal').modal('hide')
  }
})

export default Component.extend({
  tag: 'forgot-password-modal',
  ViewModel,
  view
})
