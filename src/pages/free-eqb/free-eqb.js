import Component from 'can-component'
import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/'
import './free-eqb.less'
import view from './free-eqb.stache'
import Session from '../../models/session'
import Answer from '../../models/answer'
import Question from '../../models/question'
import questionStore from '../../models/fixtures/questions'

export const ViewModel = DefineMap.extend({
  user: {
    get (val) {
      return (Session.current && Session.current.user) || val
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
  userAnswers: {
    value () {
      if (this.questions) {
        const questions = this.questions.get ? this.questions.get() : this.questions
        return new Answer.List(
          questions.map(q => {
            return {
              userId: this.user && this.user._id,
              questionId: q._id,
              questionSortIndex: q.sortIndex,
              answer: '',
              answerChoiceNum: q.questionType === 'MULTI' ? new DefineList([2]) : null
            }
          })
        )
      }
    }
  },

  choices (list) {
    return list ? list.join(', ') : ''
  },

  sendPhone () {
    if (!this.user) {
      throw new Error('User is not defined')
    }
    this.user.assign({
      phone: this.phone,
      questionnaire: 'WAITING-CODE'
    })
    this.user.save()
  },
  sendCode () {
    if (!this.user) {
      throw new Error('User is not defined')
    }
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
        if (answer.answerChoiceNum && answer.answerChoiceNum.length) {
          answer.answer = answer.answerChoiceNum.map((answerChoiceNum, i) => {
            return answerChoiceNum ? questions[i].answerOptions[answer.answerChoiceNum] : null
          }).filter(a => a !== null)
        } else {
          answer.answer = questions[i].answerOptions[answer.answerChoiceNum]
        }
      }
    })
    console.log(this.userAnswers)

    // todo: update user after answers are saved.
    this.user.questionnaire = 'COMPLETED'

    // this.answers.forEach(a => a.save())
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
