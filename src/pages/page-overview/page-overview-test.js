import QUnit from 'steal-qunit'
import { ViewModel } from './page-overview'

// ViewModel unit tests
QUnit.module('easy-app/pages/page-overview')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the page-overview component')
})
