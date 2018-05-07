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
  // Starts with 1:
  questionSortIndex: 'number',
  answer: 'string',
  // Enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']:
  answerChoice: 'string',
  createdAt: 'date'
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
  feathersService: feathersClient.service('answers'),
  name: 'answers',
  algebra
})

export default Answer
