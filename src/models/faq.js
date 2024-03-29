import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const Faq = DefineMap.extend('Faq', {
  _id: 'any',
  question: 'string',
  answer: 'string',
  category: 'string'
})

Faq.List = DefineList.extend({
  '#': Faq
})

Faq.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Faq,
  List: Faq.List,
  feathersService: feathersClient.service('faq'),
  name: 'faq',
  algebra
})

Faq.algebra = algebra

export default Faq
