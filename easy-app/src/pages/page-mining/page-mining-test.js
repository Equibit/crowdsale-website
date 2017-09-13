import QUnit from 'steal-qunit';
import { ViewModel } from './page-mining';

// ViewModel unit tests
QUnit.module('easy-app/pages/page-mining');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-mining component');
});
