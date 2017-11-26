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

  // This is for set-password modal
  // todo: consider passing the tmpPassword to set-password component directly.
  tmpPassword: 'string',

  get isAdmin () {
    return (this.user && (this.user.isAdmin === 1 || this.user.isAdmin)) || false
  },
  get kycComplete () {
    return (this.user && (this.user.kycComplete === 1 || this.user.kycComplete)) || false
  },
  get kycApproved () {
    return (this.user && (this.user.kycApproved === 1 || this.user.kycApproved)) || false
  },
  get locked () {
    return (this.user && (this.user.locked === 1 || this.user.locked)) || false
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
      .then(({ user }) => {
        if (!this.user) {
          this.user = user
        }
        if (!this.loggedIn) {
          this.loggedIn = true
        }
        return this.user
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
