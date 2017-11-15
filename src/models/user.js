import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const User = DefineMap.extend('Users', {
  _id: 'any',
  email: String,
  // We never send password when saving User.
  password: {
    String,
    serialize: false
  },
  setPassword: Boolean,
  accountCreated: Number,
  lastLogin: Number,
  locked: Boolean,
  isAdmin: Boolean,
  signUp (email) {
    return feathersClient.service('users').create({email})
  },
  forgotPassword (email) {
    return feathersClient.service('forgot-password').create({email})
  },
  changePassword (newPassword, oldPassword) {
    return feathersClient.service('users').patch(this._id, {password: newPassword, oldPassword})
  },
  changeEmail (password, newEmail, emailCode) {
    return feathersClient.service('users').patch(this._id, {password, newEmail, emailCode})
  }
})

User.List = DefineList.extend({
  '#': User
})

User.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: User,
  List: User.List,
  feathersService: feathersClient.service('user'),
  name: 'user',
  algebra
})

User.algebra = algebra

export default User
