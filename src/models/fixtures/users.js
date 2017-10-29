import fixture from 'can-fixture'
import User from '../users'

const store = fixture.store([{
  id: 1,
  email: 'godardm@gmail.com',
  password: '1234',
  setPassword: false,
  accountCreated: '1509289536',
  lastLogin: '1509289536',
  locked: false,
  kycComplete: true,
  kycApproved: true,
  isAdmin: false
}, {
  id: 2,
  email: 'admin@admin.com',
  password: '1234',
  setPassword: false,
  accountCreated: '1509289536',
  lastLogin: '1509289536',
  locked: false,
  kycComplete: true,
  kycApproved: true,
  isAdmin: true
}, {
  id: 3,
  email: 'locked@locked.com',
  password: '1234',
  setPassword: false,
  accountCreated: '1509289536',
  lastLogin: '1509289536',
  locked: true,
  kycComplete: true,
  kycApproved: true,
  isAdmin: false
}, {
  id: 4,
  email: 'set@password.com',
  password: '1234',
  setPassword: true,
  accountCreated: '1509289536',
  lastLogin: '1509289536',
  locked: false,
  kycComplete: true,
  kycApproved: true,
  isAdmin: false
}, {
  id: 5,
  email: 'kyc@notcomplete.com',
  password: '1234',
  setPassword: false,
  accountCreated: '1509289536',
  lastLogin: '1509289536',
  locked: false,
  kycComplete: false,
  kycApproved: false,
  isAdmin: false
}, {
  id: 6,
  email: 'kyc@notapproved.com',
  password: '1234',
  setPassword: true,
  accountCreated: '1509289536',
  lastLogin: '1509289536',
  locked: false,
  kycComplete: true,
  kycApproved: false,
  isAdmin: false
}], User.connection.algebra)

fixture('/user/{id}', store)

export default store
