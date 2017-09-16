import QUnit from 'steal-qunit';
import { ViewModel } from './page-blog';

// ViewModel unit tests
QUnit.module('tx/pages/page-blog');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-blog component');
});
