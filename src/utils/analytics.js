import $ from 'jquery'

$.getScript('//www.google-analytics.com/analytics.js')
window.ga = window.ga || function () {
  (ga.q = ga.q || []).push(arguments)
}
ga.l = +new Date()
ga('create', 'UA-106618490-1', 'auto')
ga('send', 'pageview')

export default function trackEvent (category, action) {
  ga('send', 'event', category, action)
}
