import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './login.less'
import view from './login.stache'
import feathersClient from '~/models/feathers-client'
import validate from '~/utils/validators'

export const ViewModel = DefineMap.extend({
	loginError: 'boolean',
	emailError: 'string',
	passwordError: 'string',
	appState: {
		type: 'any'
	},
	timeFromNow: {
		type: 'any'
	},
	password: {
		type: 'string',
		set (value) {
			this.passwordError = validate.password(value, {allowEmpty: 1})
			return value
		}
	},
	email: {
		type: 'string',
		set (value) {
			this.emailError = validate.email(value, {allowEmpty: 1})
			return value
		}
	},
	passwordVisible: {
		value: false
	},
	processing: 'boolean',
	disableForm: {
		type: 'boolean',
		value: false
	},
	hasErrors: {
		get () {
			this.emailError = validate.email(this.email, {allowEmpty: 0})
			this.passwordError = validate.password(this.password, {allowEmpty: 0})
			return this.emailError || this.passwordError
		}
	},
	toggleType() {
		this.passwordVisible = !this.passwordVisible
	},
	handleLogin (ev, email, password) {
		ev.preventDefault()
		if (this.hasErrors) return false
		this.loginError = false
		this.processing = true
		this.disableForm = true

		feathersClient.authenticate({ strategy: 'local', email: email, password: password })
			.then(response => {
				this.processing = false
				return feathersClient.passport.verifyJWT(response.accessToken)
			})
			.then(payload => {
				this.appState.isAdmin = payload.admin
				return feathersClient.service('users').get(payload.userId)
			})
			.then(user => {
				feathersClient.set('user', user)
				this.appState.kycComplete = (user.kycComplete === 1 || user.kycComplete)
				this.appState.kycApproved = (user.kycApproved === 1 || user.kycApproved)
				this.appState.locked = (user.locked === 1 || user.locked)

				$('#login-modal').modal("hide")

				if (user.setPassword === 1 || user.setPassword) {
					this.appState.loggedIn = true
					$('#set-password-modal').modal("show")
				} else {
					this.appState.loggedIn = true
				}
				this.clearForm()
			})
			.catch(() => {
				this.loginError = true
				this.processing = false
				this.disableForm = false
				this.appState.loggedIn = false
				this.appState.isAdmin = false
			})
	},
	clearForm() {
		this.processing = false
		this.loginError = false
		this.disableForm = false
		this.email = null
		this.password = null

		$('#login-modal').modal('hide')
	}
})

export default Component.extend({
	tag: 'login-modal',
	ViewModel,
	view
})
