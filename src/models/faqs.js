import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const FAQs = DefineMap.extend('Blog', {
  id: 'any',
  question: 'string',
  answer: 'string',
  category: 'string'
})

FAQs.List = DefineList.extend({
  '#': FAQs
})

FAQs.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: FAQs,
  List: FAQs.List,
  feathersService: feathersClient.service('faqs'),
  name: 'faqs',
  algebra
})

FAQs.algebra = algebra

export default FAQs
