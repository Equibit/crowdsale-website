import QUnit from 'steal-qunit'
import { ViewModel } from './count-down'

// ViewModel unit tests
QUnit.module('tx/components/count-down')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the count-down component')
})
