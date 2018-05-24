import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './page-profile.less'
import view from './page-profile.stache'
import Session from '~/models/session'
import route from 'can-route'
import IcoBalance from '../../models/ico-balance'

export const ViewModel = DefineMap.extend({
  user: {
    value () {
      return Session.current && Session.current.user
    }
  },
  icoItems: {
    get (val, resolve) {
      if (this.user && this.user._id) {
        IcoBalance.getList({userId: this.user._id}).then(resolve)
      }
    }
  },
  sum: {
    get () {
      return (this.user && ((this.user.ico || 0) + (this.user.saft || 0))) || 0
    }
  },
  summ (index) {
    return this.sum + ((this.icoItems && this.icoItems.reduce((acc, item, i) => {
      return acc + (i <= index ? item.amountEqb : 0)
    }, 0)) || 0)
  },
  session: {
    type: 'any'
  },
  logout () {
    this.session.logout()
    route.data.set({page: 'home'}, true)
  }
})

export default Component.extend({
  tag: 'page-profile',
  ViewModel,
  view
})
