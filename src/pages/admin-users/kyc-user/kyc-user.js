import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './kyc-user.less'
import view from './kyc-user.stache'
import User from '~/models/user'

export const ViewModel = DefineMap.extend({
	disableForm: {
		value: false
	},
	processing: 'boolean',
	kycUser: {
	  type: 'any'
	},
	editUser: {
		Type: User
	},
})

export default Component.extend({
  tag: 'kyc-user',
  ViewModel,
  view
})
