import QUnit from 'steal-qunit'
import { ViewModel } from './page-team'

// ViewModel unit tests
QUnit.module('tx/pages/page-team')

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-team component')
});
