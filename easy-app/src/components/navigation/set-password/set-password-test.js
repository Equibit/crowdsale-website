import QUnit from 'steal-qunit'
import { ViewModel } from './set-password'

// ViewModel unit tests
QUnit.module('easy-app/components/navigation/set-password')

QUnit.test('Has message', function(){
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the set-password-modal component')
});
