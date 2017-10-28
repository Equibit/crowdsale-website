// import '~/utils/polyfill'
import '~/utils/helpers'
import '~/utils/analytics'
import DefineMap from 'can-define/map/map'
import route from 'can-route'
import 'can-route-pushstate'
import 'jquery'
import 'bootstrap'
import AppState from './models/appState'

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
    Type: AppState,
    Value: AppState,
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

export default AppViewModel
