import QUnit from 'steal-qunit'
import { ViewModel } from './page-faq'

// ViewModel unit tests
QUnit.module('tx/pages/page-faq')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the page-faq component')
})
