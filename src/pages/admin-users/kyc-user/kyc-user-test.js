import QUnit from 'steal-qunit'
import { ViewModel } from './kyc-user'

// ViewModel unit tests
QUnit.module('tx/pages/admin-users/kyc-user')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the kyc-user component')
})
