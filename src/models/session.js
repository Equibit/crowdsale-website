import feathersClient from './feathers-client'
import DefineMap from 'can-define/map/map'
import User from './users'
import behaviors from './behaviors'
import feathersSessionBehavior from 'can-connect-feathers/session/session'
import connect from 'can-connect'

export const Session = DefineMap.extend('Session', {
  userId: 'any',
  admin: 'boolean',
  // Automatically populate the `user` when a `userId` is set.
  user: {
    Type: User,
    get (lastSetVal, resolve) {
      if (lastSetVal) {
        return lastSetVal
      }
      if (this.userId) {
        User.get(this.userId).then(resolve)
      }
    }
  },
  exp: 'number',
  aud: 'string',
  iat: 'number',
  iss: 'string',
  sub: 'string'
})

Session.connection = connect([
  feathersSessionBehavior,
  ...behaviors
], {
  feathersClient,
  idProp: 'exp',
  Map: Session,
  name: 'session'
})

export default Session
