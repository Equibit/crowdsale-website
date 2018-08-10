import Component from 'can-component'
import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
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
  allItems: {
    get () {
      const items = new IcoBalance.List([])
      const extras = [
        {prop: 'ico', code: 'ICO', date: new Date('March 1, 2017')},
        {prop: 'saft', code: 'SAFT 1', date: new Date('March 30, 2017')},
        {prop: 'icoBonus', code: 'ICO Bonus', date: new Date('May 25, 2018')}
      ]
      extras.forEach(item => {
        const amountEqb = this.user[item.prop]
        if (amountEqb && amountEqb > 0) {
          items.push(new IcoBalance({
            type: item.code,
            amountEqb,
            createdAt: item.date
          }))
        }
      })
      if (this.icoItems) {
        items.push.apply(items, this.icoItems)
      }

      return items
    }
  },
  summ (index) {
    return (this.allItems && this.allItems.reduce((acc, item, i) => {
      return acc + (i <= index ? item.amountEqb : 0)
    }, 0)) || 0
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
