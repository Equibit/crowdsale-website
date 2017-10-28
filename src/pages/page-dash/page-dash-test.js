import QUnit from 'steal-qunit'
import { ViewModel } from './page-dash'

// ViewModel unit tests
QUnit.module('tx/pages/page-dash')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the page-dash component')
})
