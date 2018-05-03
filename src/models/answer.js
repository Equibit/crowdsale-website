import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import connect from 'can-connect'
import set from 'can-set'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'

const Answer = DefineMap.extend({
  seal: false
}, {
  '_id': 'any',
  userId: 'string',
  questionId: 'string',
  userAnswer: 'string'
})

Answer.List = DefineList.extend({
  '#': Answer
})

const algebra = new set.Algebra(
  set.props.id('_id')
)

Answer.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Answer,
  List: Answer.List,
  feathersService: feathersClient.service('answer'),
  name: 'answer',
  algebra
})

export default Answer
