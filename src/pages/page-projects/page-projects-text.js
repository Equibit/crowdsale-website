import QUnit from 'steal-qunit'
import { ViewModel } from './page-projects'

// ViewModel unit tests
QUnit.module('tx/pages/page-projects')

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the page-projects component')
});
