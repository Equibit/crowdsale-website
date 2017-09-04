import QUnit from 'steal-qunit'
import { ViewModel } from './page-privacy'

// ViewModel unit tests
QUnit.module('easy-app/pages/page-privacy')

QUnit.test('Has message', function(){
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the page-privacy component')
})
