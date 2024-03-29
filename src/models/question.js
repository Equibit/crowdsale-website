import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import connect from 'can-connect'
import set from 'can-set'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'

const Question = DefineMap.extend('Question', {
  seal: false
}, {
  '_id': 'any',
  question: 'string',
  // enum: ['MULTI', 'SINGLE']
  questionType: 'string',
  // Array of strings. Value 'CUSTOM' is for user custom answer.
  answerOptions: 'any',
  sortIndex: 'number',
  createdAt: 'date'
})

Question.List = DefineList.extend('QuestionList', {
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
  feathersService: feathersClient.service('questions'),
  name: 'questions',
  algebra
})

export default Question
