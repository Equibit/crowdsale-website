import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './free-eqb.less'
import view from './free-eqb.stache'
import Answer from '../../models/answer'

export const ViewModel = DefineMap.extend({
  user: '*',
  phone: 'string',
  questions: '*',
  userAnswers: '*',
  sendPhone () {
    this.user.assign({
      phone: this.phone,
      questionnaire: 'CODE'
    })
    this.user.save()
  },
  submitAnswers () {
    const answers = new Answer.List([])
    this.userAnswers.forEach((userAnswer, i) => {
      answers.push({
        userId: this.user._id,
        questionId: this.questions[i]._id,
        userAnswer
      })
    })
    answers.forEach((a, i) => {
    })
    answers.forEach(a => a.save())
  }
})

export default Component.extend({
  tag: 'free-eqb',
  ViewModel,
  view
})
