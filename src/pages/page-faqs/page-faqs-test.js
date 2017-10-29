import QUnit from 'steal-qunit'
import { ViewModel } from './page-faqs'

// ViewModel unit tests
QUnit.module('tx/pages/page-faqs')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the page-faqs component')
})
