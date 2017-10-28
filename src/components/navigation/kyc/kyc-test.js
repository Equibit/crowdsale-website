import QUnit from 'steal-qunit'
import { ViewModel } from './kyc'

// ViewModel unit tests
QUnit.module('tx/components/navigation/kyc')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the kyc-modal component')
})
