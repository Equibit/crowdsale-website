import QUnit from 'steal-qunit';
import { ViewModel } from './page-about';

// ViewModel unit tests
QUnit.module('tx/pages/page-about');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-about component');
});
