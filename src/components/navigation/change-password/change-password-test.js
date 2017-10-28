import QUnit from 'steal-qunit'
import { ViewModel } from './change-password'

// ViewModel unit tests
QUnit.module('tx/components/navigation/change-password')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the change-password-modal component')
})
