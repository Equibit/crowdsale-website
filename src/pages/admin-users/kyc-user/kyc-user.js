import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './kyc-user.less'
import view from './kyc-user.stache'
import Users from '~/models/users'
import '~/models/fixtures/users'
import KYC from '~/models/kyc'
import '~/models/fixtures/kyc'

export const ViewModel = DefineMap.extend({
  disableForm: {
    value: false
  },
  processing: 'boolean',
  kyc: {
    Type: KYC
  },
  editUser: {
    Type: Users
  },
  appState: {
    type: 'any'
  }
})

export default Component.extend({
  tag: 'kyc-user',
  ViewModel,
  view
})
