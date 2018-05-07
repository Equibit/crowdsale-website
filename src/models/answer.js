import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import connect from 'can-connect'
import set from 'can-set'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'

const Answer = DefineMap.extend('Answer', {
  seal: false
}, {
  '_id': 'any',
  userId: 'string',
  questionId: 'string',
  // Starts with 1:
  questionSortIndex: 'number',
  answer: 'string',
  // Enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']:
  answerChoiceNum: {
    serialize: false,
    type: 'any'
  },
  answerChoice: {
    serialize: true,
    type: 'string',
    get () {
      return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][this.answerChoiceNum]
    }
  },
  createdAt: 'date'
})

Answer.List = DefineList.extend('AnswerList', {
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
