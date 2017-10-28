import QUnit from 'steal-qunit'
import { ViewModel } from './admin-blog'

// ViewModel unit tests
QUnit.module('tx/pages/admin-blog')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the admin-blog component')
})
