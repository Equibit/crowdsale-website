import 'steal-mocha'
import chai from 'chai/chai'
import 'ico/pages/page-profile/page-profile-test'
import IcoBalance from './ico-balance'

const assert = chai.assert

describe('models/ico-balance', function () {
  it('should getList', function (done) {
    IcoBalance.getList().then(function (items) {
      assert.equal(items.length, 2)
      assert.equal(items.item(0).description, 'First item')
      done()
    })
  })
})
