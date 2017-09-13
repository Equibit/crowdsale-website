import QUnit from 'steal-qunit';
import { ViewModel } from './page-contact';

// ViewModel unit tests
QUnit.module('easy-app/pages/page-contact');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-contact component');
});
