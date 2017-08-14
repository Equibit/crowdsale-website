import QUnit from 'steal-qunit'
import { ViewModel } from './page-home'

// ViewModel unit tests
QUnit.module('tx/pages/page-home')

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-home component')
});
