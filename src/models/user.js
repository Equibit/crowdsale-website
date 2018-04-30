import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const User = DefineMap.extend('User', {
  _id: 'any',
  email: 'string',
  // We never send password when saving User.
  password: {
    type: 'string',
    serialize: false
  },
  setPassword: 'boolean',
  accountCreated: 'number',
  lastLogin: 'number',
  locked: 'boolean',
  isAdmin: 'boolean',
  isNewUser: 'boolean',
  ico: { type: 'number', value: 0 },
  saft: { type: 'number', value: 0 },

  createdAt: 'date',
  updatedAt: 'date',

  signUp (email) {
    if (email && email.toLowerCase) {
      email = email.toLowerCase()
    }
    return feathersClient.service('users').create({email})
  },
  forgotPassword (email) {
    if (email && email.toLowerCase) {
      email = email.toLowerCase()
    }
    return feathersClient.service('forgot-password').create({email})
  },
  changePassword (newPassword, oldPassword) {
    return feathersClient.service('users').patch(this._id, {password: newPassword, oldPassword})
  },
  changeEmail (password, newEmail, emailCode) {
    if (newEmail && newEmail.toLowerCase) {
      newEmail = newEmail.toLowerCase()
    }
    return feathersClient.service('users').patch(this._id, {password, newEmail, emailCode})
  }
})

User.List = DefineList.extend('Users', {
  '#': User
})

User.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: User,
  List: User.List,
  feathersService: feathersClient.service('users'),
  name: 'users',
  algebra
})

User.algebra = algebra

export default User
