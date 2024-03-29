import DefineMap from 'can-define/map/map'
import feathersClient from '~/models/feathers-client'

const AppState = DefineMap.extend('AppState', {
  loggedIn: {
    set (val) {
      if (!val) {
        this.clearAuthInterval()
        this.isAdmin = false
      } else {
        this.setAuthInterval()
        this.sessionError = false
      }
      return val
    }
  },
  isAdmin: {
    value: false
  },
  kycComplete: {
    value: false
  },
  kycApproved: {
    value: false
  },
  locked: {
    value: false
  },
  sessionError: {
    value: false
  },
  authInterval: '*',
  setAuthInterval () {
    if (this.authInterval) {
      this.clearAuthInterval()
    }
    this.authInterval = setInterval(() => this.authenticate(), 2700000)
  },
  clearAuthInterval () {
    clearInterval(this.authInterval)
  },
  // todo: move this to the user model to have auth stuff in one place.
  authenticate () {
    return feathersClient.passport.getJWT()
      .then(token => {
        if (!token) {
          return Promise.reject(new Error('no token'))
        } else {
          return feathersClient.passport.payloadIsValid(token)
            ? feathersClient.authenticate({
              strategy: 'jwt',
              accessToken: token
            })
            : Promise.reject(new Error('Token is expired'))
        }
      })
      .then(data => {
        return feathersClient.passport.verifyJWT(data.accessToken)
      })
      .then(payload => {
        return feathersClient.service('user').get(payload.userId)
      })
      .then(user => {
        this.kycComplete = (user.kycComplete === 1 || user.kycComplete)
        this.kycApproved = (user.kycApproved === 1 || user.kycApproved)
        this.locked = (user.locked === 1 || user.locked)
        this.isAdmin = (user.isAdmin === 1 || user.isAdmin)

        feathersClient.set('user', user)

        if (!this.loggedIn) {
          this.loggedIn = true
        }

        return user
      })
      .catch(err => {
        this.logout()
        if (err !== 'no token') this.sessionError = true
        return Promise.reject(new Error('no valid token'))
      })
  },
  logout () {
    this.loggedIn = false
    this.isAdmin = false
    feathersClient.logout()
  },
  error401 () {
    this.logout()
    this.sessionError = true
  }
})

export default function (opt) {
  return new AppState(opt)
}
