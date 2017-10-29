import F from 'funcunit'
import Mocha from 'steal-mocha'
// This is faster for browser:
import chai from 'chai/chai'
const assert = chai.assert

//
// import '~/models/test'
// import 'tx/components/navigation/kyc/kyc-test'
// import 'tx/components/navigation/change-password/change-password-test'
// import 'tx/components/navigation/change-email/change-email-test'
// import 'tx/pages/admin-users/edit-user/edit-user-test'
// import 'tx/pages/admin-users/kyc-user/kyc-user-test'
// import 'tx/pages/page-about/page-about-test'
// import 'tx/pages/page-blog/page-blog-test'
// import 'tx/pages/page-universe/page-universe-test'
// import 'tx/pages/admin-blog/admin-blog-test'
// import 'tx/pages/page-blog/blog-post/blog-post-test'
// import 'tx/pages/page-dash/page-dash-test'
// import 'tx/pages/admin-tickets/admin-tickets-test'
// import 'tx/pages/admin-tickets/ticket-details/ticket-details-test'
// import 'tx/pages/page-faq/page-faq-test'
// import 'tx/pages/admin-faq/admin-faq-test'

F.attach(Mocha)

describe('tx functional smoke test', function () {
  this.timeout(15000)

  beforeEach(function (done) {
    F.open('./development.html', done)
  })

  it('Main page shows up', function (done) {
    F('a.navbar-brand').visible(function () {
      const title = F('title').text()
      console.log(`title = ${title}`)
      assert.equal(title, 'Tx Base | Built with Blocks')
      done()
    })
  })
})
