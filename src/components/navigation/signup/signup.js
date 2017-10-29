import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './signup.less'
import view from './signup.stache'
import validate from '~/utils/validators'
import Users from '~/models/users'
import '~/models/fixtures/users'

export const ViewModel = DefineMap.extend({
  isAccountCreated: 'boolean',
  signUpError: 'boolean',
  emailError: 'string',
  termsError: 'string',
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
  agreeTerms: {
    type: 'boolean',
    set (value) {
      this.termsError = ''
      return value
    }
  },
  validSignUp: {
    get () {
      this.emailError = validate.email(this.email, {allowEmpty: 0})
      this.termsError = validate.terms(this.agreeTerms)
      return !this.emailError && !this.termsError
    }
  },
  handleSignUp (ev, email) {
    ev.preventDefault()
    if (!this.validSignUp) return false
    this.signUpError = false
    this.processing = true
    this.disableForm = true

    let newUser = new Users()
    newUser.signUp(email)
      .then(() => {
        this.isAccountCreated = true
        this.processing = false
      })
      .catch(() => {
        this.disableForm = false
        this.processing = false
        this.signUpError = true
      })
  },
  clearForm () {
    this.isAccountCreated = false
    this.processing = false
    this.signUpError = false
    this.disableForm = false
    this.email = null
    this.agreeTerms = null

    $('#sign-up-modal').modal('hide')
  }
})

export default Component.extend({
  tag: 'signup-modal',
  ViewModel,
  view
})
