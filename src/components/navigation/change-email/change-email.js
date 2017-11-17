import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './change-email.less'
import view from './change-email.stache'
import feathersClient from '~/models/feathers-client'
import validate from '~/utils/validators'
import User from '~/models/user'

export const ViewModel = DefineMap.extend({
  session: {
    type: 'any'
  },
  changeError: 'boolean',
  passwordVisible: 'boolean',
  processing: 'boolean',
  disableForm: {
    value: false
  },
  password: 'string',
  passwordError: 'string',
  newEmail: 'string',
  newEmailError: 'string',
  verificationCodeVisible: {
    value: false
  },
  emailCode: 'string',
  hasErrors: {
    get () {
      this.passwordError = validate.password(this.password, {allowEmpty: 0})
      this.newEmailError = validate.email(this.newEmail, {allowEmpty: 0})
      return this.newEmailError || this.passwordError
    }
  },
  toggleType () {
    this.passwordVisible = !this.passwordVisible
  },
  handleChangeEmail (ev, password, email, emailCode) {
    ev.preventDefault()
    if (this.hasErrors) return false
    this.changeError = false
    this.processing = true
    this.disableForm = true

    this.session.user.changeEmail(password, email, emailCode)
      .then(() => {
        if (this.verificationCodeVisible) {
          this.clearForm()
        } else {
          this.disableForm = false
          this.processing = false
          this.verificationCodeVisible = true
        }
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
    this.password = null
    this.passwordError = null
    this.newEmail = null
    this.newEmailError = null
    this.verificationCodeVisible = false

    $('#change-email-modal').modal('hide')
  }
})

export default Component.extend({
  tag: 'change-email-modal',
  ViewModel,
  view
})
