import QUnit from 'steal-qunit';
import { ViewModel } from './admin-users';

// ViewModel unit tests
QUnit.module('easy-app/pages/admin-users');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the admin-users component');
});
