import $ from 'jquery'
import DefineMap from 'can-define/map/map'
import route from 'can-route'
import 'can-route-pushstate'
import 'bootstrap'

const AppViewModel = DefineMap.extend({
  page: "string",
	title: {
		get() {
			if (this.page === "privacy") {
				return "Tx Universe | Privacy Statement"
      } else if (this.page === "terms") {
				return "Tx Universe | Terms of Service"
      } else {
				return "Tx Universe"
      }
		},
		serialize: false
	}
})

route('{page}', {page: 'home'})

export default AppViewModel
