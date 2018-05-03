import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import connect from 'can-connect'
import set from 'can-set'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'

const IcoBalance = DefineMap.extend({
  seal: false
}, {
  '_id': 'any',
  userId: { type: '*' },
  // enum: ['ICO', 'SAFT', 'AIRDROP']
  type: { type: 'string' },
  amountEqb: { type: 'number' },
  amountBtc: { type: 'number' },
  address: { type: 'string' },
  addressIndex: { type: 'number' },
  fromAddress: { type: 'string' },
  paidAt: { type: 'date' },
  createdAt: { type: 'date' }
})

const algebra = new set.Algebra(
  set.props.id('_id')
)

IcoBalance.List = DefineList.extend({
  '#': IcoBalance
})

IcoBalance.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: IcoBalance,
  List: IcoBalance.List,
  feathersService: feathersClient.service('ico-balance'),
  name: 'ico-balance',
  algebra
})

export default IcoBalance
