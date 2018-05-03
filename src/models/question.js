import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import connect from 'can-connect'
import set from 'can-set'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'

const Question = DefineMap.extend({
  seal: false
}, {
  '_id': 'any',
  question: 'string',
  sortIndex: 'number'
})

Question.List = DefineList.extend({
  '#': Question
})

const algebra = new set.Algebra(
  set.props.id('_id')
)

Question.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Question,
  List: Question.List,
  feathersService: feathersClient.service('question'),
  name: 'question',
  algebra
})

export default Question
