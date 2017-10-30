import fixture from 'can-fixture'
import Faq from '../faq'

const store = fixture.store([{
  id: 1,
  question: 'Why FAQs?',
  answer: 'Because they are needed!',
  category: 'About FAQs'
}, {
  id: 2,
  question: 'Do the categories work?',
  answer: 'I hope so!',
  category: 'About FAQs'
}, {
  id: 3,
  question: 'Another question?',
  answer: 'An answer!',
  category: 'Some Filler Stuff'
}, {
  id: 4,
  question: 'Some Question?',
  answer: 'Some Answer!',
  category: 'Some Filler Stuff'
}], Faq.connection.algebra)

fixture('/faq/{id}', store)

export default store
