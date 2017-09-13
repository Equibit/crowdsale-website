import QUnit from 'steal-qunit';
import { ViewModel } from './page-video';

// ViewModel unit tests
QUnit.module('easy-app/pages/page-video');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-video component');
});
