import fixture from 'can-fixture'
import Question from '../question'

const store = fixture.store([
  {
    '_id': '5aefe55da6bac4e306feb77a',
    'question': 'What best describes your interest in Equibit?',
    'sortIndex': 1,
    'questionType': 'SINGLE',
    'answerOptions': [
      'I just want the free EQB for completing this questionnaire <strong>[end]</strong>',
      'I’m interested in both investing and raising money for companies on the blockchain',
      'I’m only interested in using Equibit Portfolio to invest in companies',
      'I’m only interested in using Equibit Portfolio to raise money for companies <strong>[Goto Q8]</strong>'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb77b',
    'question': 'How likely are you to use Equibit Portfolio to invest in a company?',
    'sortIndex': 2,
    'questionType': 'SINGLE',
    'answerOptions': [
      'Unlikely <strong>[end]</strong>',
      'Somewhat likely',
      'Very likely',
      'Don’t know',
      'CUSTOM'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb77c',
    'question': 'What types of companies are you most interested investing in?',
    'sortIndex': 3,
    'questionType': 'MULTI',
    'answerOptions': [
      'Blockchain',
      'Fintech',
      'Cannabis',
      'Any Start-up',
      'Traditional/Blue chip',
      'Any',
      'Don’t know'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb77d',
    'question': 'Are you an “Accredited Investor? That is; do you earn more than $250,000 (USD)/year or have over $1,000,000 USD in liquid Assets or have a net worth of over $5,000,000',
    'sortIndex': 4,
    'questionType': 'SINGLE',
    'answerOptions': [
      'Yes',
      'No'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb77e',
    'question': 'What is the current approximate size of your investment portfolio (Both crypto and other)?',
    'sortIndex': 5,
    'questionType': 'SINGLE',
    'answerOptions': [
      'Let than one BTC',
      'Between 1 and 10 BTC',
      'More than 10 BYTC but less than 100 BTC',
      'More than 100 BTC'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb77f',
    'question': 'How would you describe your blockchain investment strategy?',
    'sortIndex': 6,
    'questionType': 'MULTI',
    'answerOptions': [
      'I buy and sell crypto currencies (ICOs and aftermarket)',
      'I buy and sell equity (shares) in crypto related business',
      'I look forward to using the EQB network and tools to invest in all manner of companies.'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb780',
    'question': 'What features are important to you while selecting equities or assets for your portfolio?',
    'sortIndex': 7,
    'questionType': 'SINGLE',
    'answerOptions': [
      'Voting Rights (an investor Voice)',
      'Capital Gains (asset appreciation)',
      'Dividends',
      'Diversity',
      'CUSTOM',
      'Don’t know'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb781',
    'question': 'What language(s )are you most comfortable using or conducting business in?',
    'sortIndex': 8,
    'questionType': 'MULTI',
    'answerOptions': [
      'English',
      'Simplified Chinese',
      'French',
      'Spanish',
      'Hindi',
      'Korean',
      'CUSTOM'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb782',
    'question': 'What geographic regions (based on corporate head office address) are you interested in?',
    'sortIndex': 9,
    'questionType': 'SINGLE',
    'answerOptions': [
      'North America',
      'Europe',
      'Asia',
      'South America',
      'Australia',
      'Africa'
    ]
  },
  {
    '_id': '5aefe55da6bac4e306feb783',
    'question': 'What county do you consider home?',
    'sortIndex': 10,
    'questionType': 'DROPDOWN',
    'answerOptions': [
      'COUNTRIES'
    ]
  }
], Question.connection.algebra)

fixture('/question/{_id}', store)

export default store
