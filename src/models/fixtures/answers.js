import fixture from 'can-fixture'
import Answer from '../answer'

const store = fixture.store([{
  _id: 0,
  userId: 0,
  questionId: 0,
  userAnswer: 'user 0 answer 0'
}, {
  _id: 1,
  userId: 0,
  questionId: 1,
  userAnswer: 'user 0 answer 1'
}], Answer.connection.algebra)

fixture('/answer/{_id}', store)

export default store
