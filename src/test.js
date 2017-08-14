import F from 'funcunit'
import QUnit from 'steal-qunit'
import 'tx/models/test'
import 'tx/component/navigation/navigation-test'
import 'tx/pages/page-missing/page-missing-test'
import 'tx/pages/page-home/page-home-test'
import 'tx/component/navigation/login/login-test'
import 'tx/component/navigation/signup/signup-test'
import 'tx/component/navigation/forgot-password/forgot-password-test'
import 'tx/pages/page-tos/page-tos-test'
import 'tx/pages/page-privacy/page-privacy-test'
import 'tx/component/navigation/set-password/set-password-test'

F.attach(QUnit)

QUnit.module('tx functional smoke test', {
  beforeEach() {
    F.open('./development.html')
  }
})

QUnit.test('tx main page shows up', function() {
  F('title').text('tx', 'Title is set')
})
