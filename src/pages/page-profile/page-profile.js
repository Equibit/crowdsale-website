import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './page-profile.less'
import view from './page-profile.stache'
import Session from '~/models/session'

export const ViewModel = DefineMap.extend({
  user: {
    value () {
      return Session.current && Session.current.user
    }
  },
  sum: {
    get () {
      return this.user && (this.user.ico + this.user.saft)
    }
  }
})

export default Component.extend({
  tag: 'page-profile',
  ViewModel,
  view
})
