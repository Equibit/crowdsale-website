import fixture from 'can-fixture'
import Faq from '../faq'

const store = fixture.store([{
  id: 1,
  question: 'Why FAQs?',
  answer: 'Because they are needed!',
  category: 'faqs'
}, {
  id: 2,
  question: 'Do the categories work?',
  answer: 'I hope so!',
  category: 'faqs'
}, {
  id: 3,
  question: 'Another question?',
  answer: 'An answer!',
  category: 'filler'
}, {
  id: 4,
  question: 'Some Question?',
  answer: 'Some Answer!',
  category: 'filler'
}], Faq.connection.algebra)

fixture('/faq/{id}', store)

export default store
