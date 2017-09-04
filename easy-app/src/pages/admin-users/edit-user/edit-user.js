import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './edit-user.less'
import view from './edit-user.stache'
import User from '~/models/user'

export const ViewModel = DefineMap.extend({
	disableForm: {
		value: false
	},
	processing: 'boolean',
	editUser: {
		Type: User
	},
	state: {
		type: 'any'
	},
	saveUser() {
		this.processing = true
		this.disableForm = true

		this.editUser.save()
			.then(() => {
				this.processing = false
				this.disableForm = false

				$('#EditUser').modal("hide")
			})
			.catch(err => {
				this.processing = false
				this.disableForm = false

				if (err.status === 401) this.state.error401()
				else console.log(err)
			})
	}
})

export default Component.extend({
  tag: 'edit-user',
  ViewModel,
  view
})
