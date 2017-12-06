import 'steal-mocha'
import chai from 'chai/chai'
import { ViewModel } from './page-profile'

const assert = chai.assert

describe('page-profile vm', function () {
  it('should set the correct message', function () {
    var vm = new ViewModel()
    assert.equal(vm.message, 'This is the page-profile component')
  })
})
