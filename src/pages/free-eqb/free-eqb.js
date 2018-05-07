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
      this.questionsPromise.then(resolve)
      // return questionStore.getList({}).data
    }
  },
  userAnswers: {
    value () {
      if (this.questions) {
        return new Answer.List(
          this.questions.get().map(q => {
            return {
              userId: this.user._id,
              questionId: q._id,
              questionSortIndex: q.sortIndex,
              answer: '',
              answerChoiceNum: Math.random()
            }
          })
        )
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
    const questions = this.questions
    // Update non-CUSTOM answer text value:
    this.userAnswers.forEach((answer, i) => {
      if (questions[i].answerOptions[answer.answerChoiceNum] !== 'CUSTOM') {
        answer.answer = questions[i].answerOptions[answer.answerChoiceNum]
      }
    })
    console.log(this.userAnswers)

    //this.answers.forEach(a => a.save())
    // todo: remove this after integrating with serivices.
    //this.user.questionnaire = 'COMPLETED'
  },

  selectCustom (answer, num) {
    answer.answerChoiceNum = num
  }
})

export default Component.extend({
  tag: 'free-eqb',
  ViewModel,
  view
})
