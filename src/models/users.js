import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const Users = DefineMap.extend('Users', {
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
  }
})

Users.List = DefineList.extend({
  '#': Users
})

Users.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Users,
  List: Users.List,
  feathersService: feathersClient.service('users'),
  name: 'users',
  algebra
})

Users.algebra = algebra

export default Users
