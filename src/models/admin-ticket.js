import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const Ticket = DefineMap.extend('Ticket', {
  id: 'any',
})

Ticket.List = DefineList.extend({
  '#': Ticket
})

Ticket.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Ticket,
  List: Ticket.List,
  feathersService: feathersClient.service('admin-tickets'),
  name: 'tickets',
  algebra
})

Ticket.algebra = algebra

export default Ticket