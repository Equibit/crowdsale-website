import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const User = DefineMap.extend('User', {
  id: 'any',
  email: 'string',
  password: 'string',
  setPassword: 'boolean',
  accountCreated: 'number',
  lastLogin: 'number',
  locked: 'boolean',
  signUp (email) {
    return feathersClient.service('users').create({email})
  },
  forgotPassword (email) {
    return feathersClient.service('forgot-password').create({email})
  },
  changePassword (newPassword, oldPassword) {
    return feathersClient.service('users').patch(this.id, {password: newPassword, oldPassword})
  },
  changeEmail (password, newEmail, emailCode) {
    return feathersClient.service('users').patch(this.id, {password, newEmail, emailCode})
  },
  addKyc (kycObj) {
    return feathersClient.service('user-kyc').create(kycObj)
  },
  getKyc () {
    return feathersClient.service('user-kyc').get(this.id)
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
  feathersService: feathersClient.service('users'),
  name: 'users',
  algebra
})

User.algebra = algebra

export default User
