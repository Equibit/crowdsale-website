/*

To switch to feathers todo: create config file to manage this
- make sure bearer tokens use proper time stamp (not unit)
- make sure to switch feather-client to use websockets

 */

import '~/utils/polyfill'
import '~/utils/helpers'
import DefineMap from 'can-define/map/map'
import route from 'can-route'
import 'can-route-pushstate'
import 'jquery'
import 'bootstrap'
import State from '~/models/state'

const AppViewModel = DefineMap.extend({
	'*': {
		serialize: false
	},
	page: {
		type: 'string',
		serialize: true
	},
	slug: {
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
				return "Tx Universe | Privacy Statement"
			} else if (this.page === "terms") {
				return "Tx Universe | Terms of Service"
			} else {
				return "Tx Universe"
			}
		}
	}
})

route('{page}', { page: 'home' })
route('{page}/{slug}', { slug: null })

export default AppViewModel
