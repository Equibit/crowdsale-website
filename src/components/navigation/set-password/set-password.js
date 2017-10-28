import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './set-password.less'
import view from './set-password.stache'
import feathersClient from '~/models/feathers-client'
import validate from '~/utils/validators'
import User from '~/models/user'

export const ViewModel = DefineMap.extend({
  currentUser: {
    Type: User
  },
  appState: {
    type: 'any'
  },
  changeError: 'boolean',
  processing: 'boolean',
  passwordError: 'string',
  disableForm: {
    value: false
  },
  password: {
    type: 'string',
    set (value) {
      this.passwordError = validate.password(value, {allowEmpty: 1})
      return value
    }
  },
  passwordVisible: 'boolean',
  hasErrors: {
    get () {
      this.passwordError = validate.password(this.password, {allowEmpty: 0})
      return this.passwordError
    }
  },
  updatePassword (el) {
    this.password = el.value
  },
  toggleType () {
    this.passwordVisible = !this.passwordVisible
  },
  handleSetPassword (ev, password) {
    ev.preventDefault()
    if (this.hasErrors) return false
    this.changeError = false
    this.processing = true
    this.disableForm = true

    this.currentUser = feathersClient.get('user')
    this.currentUser.changePassword(password)
      .then(() => {
        this.processing = false
        this.changeError = false
        this.disableForm = false
        this.password = null

        $('#set-password-modal').modal('hide')
      })
      .catch(err => {
        this.disableForm = false
        this.processing = false
        this.changeError = true

        if (err.status === 401) this.appState.error401()
        else console.log(err)
      })
  }
})

export default Component.extend({
  tag: 'set-password-modal',
  ViewModel,
  view,
  events: {
    inserted: function () {
      let userVar = feathersClient.get('user')
      if (userVar.setPassword === 1 || userVar.setPassword) setTimeout(() => $('#set-password-modal').modal('show'), 300)
    }
  }
})
