import QUnit from 'steal-qunit'
import { ViewModel } from './admin-tickets'

// ViewModel unit tests
QUnit.module('tx/pages/admin-tickets')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the admin-tickets component')
})
