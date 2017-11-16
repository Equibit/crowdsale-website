// import '~/utils/polyfill'
import '~/utils/helpers'
import '~/utils/analytics'
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
        return 'Tx Base | Privacy Statement'
      } else if (this.page === 'terms') {
        return 'Tx Base | Terms of Service'
      } else {
        return 'Tx Base | Built with Blocks'
      }
    }
  }
})

route('{page}', { page: 'home' })
route('{page}/{slug}', { slug: null })
route.ready()

export default AppViewModel
