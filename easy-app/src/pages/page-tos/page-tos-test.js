import QUnit from 'steal-qunit'
import { ViewModel } from './page-tos'

// ViewModel unit tests
QUnit.module('easy-app/pages/page-tos')

QUnit.test('Has message', function(){
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the page-tos component')
})
