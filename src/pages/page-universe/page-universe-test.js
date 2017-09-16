import QUnit from 'steal-qunit';
import { ViewModel } from './page-universe';

// ViewModel unit tests
QUnit.module('tx/pages/page-universe');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-universe component');
});
