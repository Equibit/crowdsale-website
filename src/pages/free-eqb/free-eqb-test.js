import QUnit from 'steal-qunit'
import { ViewModel } from './free-eqb'

// ViewModel unit tests
QUnit.module('ico/pages/free-eqb')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the free-eqb component')
})
