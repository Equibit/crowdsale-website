import QUnit from 'steal-qunit';
import { ViewModel } from './page-profile';

// ViewModel unit tests
QUnit.module('ico/pages/page-profile');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-profile component');
});
