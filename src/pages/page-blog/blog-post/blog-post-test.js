import QUnit from 'steal-qunit';
import { ViewModel } from './blog-post';

// ViewModel unit tests
QUnit.module('tx/pages/page-blog/blog-post');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the blog-post component');
});
