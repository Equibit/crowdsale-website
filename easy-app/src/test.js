import F from 'funcunit'
import QUnit from 'steal-qunit'
import '~/models/test'
import 'easy-app/pages/admin-users/edit-user/edit-user-test'
import 'easy-app/components/navigation/kyc/kyc-test'
import 'easy-app/pages/admin-users/kyc-user/kyc-user-test'
import 'easy-app/components/navigation/change-password/change-password-test'

import 'easy-app/components/navigation/change-email/change-email-test';

F.attach(QUnit)

QUnit.module('easy-app functional smoke test', {
  beforeEach() {
    F.open('./development.html')
  }
})

QUnit.test('easy-app main page shows up', function() {
  F('title').text('easy-app', 'Title is set')
});
