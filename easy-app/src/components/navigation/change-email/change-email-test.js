import QUnit from 'steal-qunit';
import { ViewModel } from './change-email';

// ViewModel unit tests
QUnit.module('easy-app/components/navigation/change-email');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the change-email-modal component');
});
