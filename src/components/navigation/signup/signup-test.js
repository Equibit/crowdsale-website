import QUnit from 'steal-qunit'
import { ViewModel } from './signup'

// ViewModel unit tests
QUnit.module('tx/components/navigation/signup')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the signup-modal component')
})
