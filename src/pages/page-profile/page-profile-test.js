import 'steal-mocha'
import chai from 'chai/chai'
import { ViewModel } from './page-profile'

const assert = chai.assert

describe('page-profile vm', function () {
  it('should calc sum as ico plus saft', function () {
    var vm = new ViewModel({
      user: {ico: 10, saft: 5}
    })
    assert.equal(vm.sum, 15)
  })
})
