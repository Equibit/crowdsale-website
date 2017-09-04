import QUnit from 'steal-qunit'
import { ViewModel } from './navigation'

// ViewModel unit tests
QUnit.module('easy-app/components/navigation')

QUnit.test('Has message', function(){
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the navigation-bar component')
})
