import F from 'funcunit'
import QUnit from 'steal-qunit'
import '~/models/test'
import 'tx/pages/admin-users/edit-user/edit-user-test'
import 'tx/components/navigation/kyc/kyc-test'
import 'tx/pages/admin-users/kyc-user/kyc-user-test'
import 'tx/components/navigation/change-password/change-password-test'
import 'tx/components/navigation/change-email/change-email-test'
import 'tx/pages/page-about/page-about-test'
import 'tx/pages/page-blog/page-blog-test'
import 'tx/pages/page-universe/page-universe-test'
import 'tx/pages/admin-blog/admin-blog-test'
import 'tx/pages/page-blog/blog-post/blog-post-test'

F.attach(QUnit)

QUnit.module('tx functional smoke test', {
  beforeEach() {
    F.open('./development.html')
  }
})

QUnit.test('tx main page shows up', function() {
  F('title').text('tx', 'Title is set')
});
