import Component from 'can-component'
import DefineMap from 'can-define/map/'
import './free-eqb.less'
import view from './free-eqb.stache'
import Session from '../../models/session'
import Answer from '../../models/answer'
import Question from '../../models/question'
import questionStore from '../../models/fixtures/questions'

export const ViewModel = DefineMap.extend({
  user: {
    get () {
      return Session.current && Session.current.user
    }
  },
  phone: 'string',
  code: 'string',
  questionsPromise: {
    get () {
      return Question.getList({})
    }
  },
  questions: {
    get (val, resolve) {
      if (val) {
        return val
      }
      // this.questionsPromise.then(resolve)
      return questionStore.getList({}).data
    }
  },
  textAnswers: {
    value () {
      if (this.questions) {
        return new Array(this.questions.length)
      }
    }
  },

  sendPhone () {
    this.user.assign({
      phone: this.phone,
      questionnaire: 'WAITING-CODE'
    })
    this.user.save()
  },
  sendCode () {
    this.user.assign({
      code: this.code
    })
    this.user.save()
      // todo: remove this after integrating with serivices.
      .then(() => {
        this.user.questionnaire = 'QUESTIONS'
      })
  },
  submitAnswers () {
    const answers = new Answer.List([])
    this.textAnswers.forEach((text, i) => {
      answers.push({
        userId: this.user._id,
        questionId: this.questions[i]._id,
        answer: text
      })
    })
    answers.forEach(a => a.save())

    // todo: remove this after integrating with serivices.
    this.user.questionnaire = 'COMPLETED'
  }
})

export default Component.extend({
  tag: 'free-eqb',
  ViewModel,
  view
})
