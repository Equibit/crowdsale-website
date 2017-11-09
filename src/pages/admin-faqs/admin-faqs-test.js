import QUnit from 'steal-qunit'
import { ViewModel } from './admin-faqs'

// ViewModel unit tests
QUnit.module('tx/pages/admin-faqs')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the admin-faqs component')
})
