import QUnit from 'steal-qunit'
import { ViewModel } from './edit-user'

// ViewModel unit tests
QUnit.module('tx/pages/admin-users/edit-user')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the edit-user component')
})
