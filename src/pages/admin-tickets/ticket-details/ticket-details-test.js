import QUnit from 'steal-qunit'
import { ViewModel } from './ticket-details'

// ViewModel unit tests
QUnit.module('tx/pages/admin-tickets/ticket-details')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the ticket-details component')
})
