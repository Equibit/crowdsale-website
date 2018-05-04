import fixture from 'can-fixture'
import Question from '../question'

const store = fixture.store([{
  _id: 0,
  question: 'First item',
  sortIndex: 0
}, {
  _id: 1,
  question: 'Second item',
  sortIndex: 1
}], Question.connection.algebra)

fixture('/question/{_id}', store)

export default store
