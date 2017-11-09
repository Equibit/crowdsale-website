import DefineMap from 'can-define/map/map'
import feathersClient from './feathers-client'
import User from './user'

const Session = DefineMap.extend('Session', {
  user: User,
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

  get isAdmin () {
    return user && (user.isAdmin === 1 || user.isAdmin) || false
  },
  get kycComplete () {
    return user && (user.kycComplete === 1 || user.kycComplete) || false
  },
  get kycApproved () {
    return user && (user.kycApproved === 1 || user.kycApproved) || false
  },
  get locked () {
    return user && (user.locked === 1 || user.locked) || false
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
        this.user = user
        if (!this.loggedIn) {
          this.loggedIn = true
        }
        return user
      })
      .catch(err => {
        this.logout()
        if (err !== 'no token') this.sessionError = true
        return Promise.reject(err)
      })
  },
  logout () {
    this.loggedIn = false
    feathersClient.logout()
  },
  error401 () {
    this.logout()
    this.sessionError = true
  }
})

// We need to export Session model to be used in tests
export default Session
