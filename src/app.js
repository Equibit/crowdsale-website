// import '~/utils/polyfill'
import '~/utils/helpers'
import '~/utils/analytics'
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
import Session from './models/session'

const AppViewModel = DefineMap.extend({
  '*': {
    serialize: false
  },
  mode: { value: 'balance-only' },
  page: {
    type: 'string',
    serialize: true
  },
  slug: {
    type: 'string',
    serialize: true
  },
  session: {
    Type: Session,
    value: function () {
      const current = new Session()
      Session.current = current
      return current
    },
    set (val) {
      if (this.session) {
        this.session.clearAuthInterval()
      }
      val.authenticate()
        .catch(() => {})
      return val
    }
  },
  title: {
    get () {
      if (this.page === 'privacy') {
        return 'Equibit Group | Privacy Statement'
      } else if (this.page === 'terms') {
        return 'Equibit Group | Terms of Service'
      } else {
        return 'Equibit Group'
      }
    }
  }
})

route('{page}', { page: 'ico' })
route('{page}/{slug}', { slug: null })
window.route = route

export default AppViewModel
