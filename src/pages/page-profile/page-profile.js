import Component from 'can-component'
import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import './page-profile.less'
import view from './page-profile.stache'
import Session from '~/models/session'

export const ViewModel = DefineMap.extend({
  user: {
    value () {
      return Session.current && Session.current.user
    }
  },
  allItems: {
    get () {
      const items = new DefineList([])
      const extras = [
        {prop: 'ico', code: 'ICO', date: new Date('March 1, 2017')},
        {prop: 'saft', code: 'SAFT 1', date: new Date('March 30, 2017')},
        {prop: 'icoBonus', code: 'ICO Bonus', date: new Date('May 25, 2018')}
      ]
      extras.forEach(item => {
        const amountEqb = this.user[item.prop]
        if (amountEqb && amountEqb > 0) {
          items.push({
            type: item.code,
            amountEqb,
            createdAt: item.date
          })
        }
      })
      return items
    }
  },
  summ (index) {
    return (this.allItems && this.allItems.reduce((acc, item, i) => {
      return acc + (i <= index ? item.amountEqb : 0)
    }, 0)) || 0
  }
})

export default Component.extend({
  tag: 'page-profile',
  ViewModel,
  view
})
