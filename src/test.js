import 'steal-mocha'
import AppVM from './app'
import chai from 'chai/chai'
import 'ico/pages/page-profile/page-profile-test';

const assert = chai.assert

describe('app vm', function () {
  it('should set the correct title', function () {
    const appVM = new AppVM()
    assert.equal(appVM.title, 'Equibit Group')
  })
})
