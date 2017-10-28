import QUnit from 'steal-qunit'
import { ViewModel } from './admin-faq'

// ViewModel unit tests
QUnit.module('tx/pages/admin-faq')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the admin-faq component')
})
