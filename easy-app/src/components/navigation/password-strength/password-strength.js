import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './password-strength.less'
import view from './password-strength.stache'
import zxcvbn from 'zxcvbn'

export const ViewModel = DefineMap.extend({
  password: 'string',
	passwordScore: {
    type: 'number',
		get () {
			return this.password && (zxcvbn(this.password).score + 1)
		}
  }
})

export default Component.extend({
  tag: 'password-strength',
  ViewModel,
  view
})
