/*

To switch to feathers todo: create config file to manage this
- make sure bearer tokens use proper time stamp (not unit)
- make sure to switch feather-client to use websockets

 */

import DefineMap from 'can-define/map/map'
import route from 'can-route'
import 'can-route-pushstate'
import 'jquery'
import 'bootstrap'
import '~/utils/helpers'
import State from '~/models/state'

const AppViewModel = DefineMap.extend({
	'*': {
		serialize: false
	},
	page: {
		type: 'string',
		serialize: true
	},
	appState: {
		Type: State,
		value: new State({}),
		set (val) {
			if (this.appState) {
				this.appState.clearAuthInterval()
			}
			val.authenticate()
				.catch(() => {})
			return val
		}
	},
	title: {
		get() {
			if (this.page === "privacy") {
				return "Equibit Group | Privacy Statement"
			} else if (this.page === "terms") {
				return "Equibit Group | Terms of Service"
			} else {
				return "Equibit Group"
			}
		}
	}
})

route('{page}', { page: 'home' })

export default AppViewModel
