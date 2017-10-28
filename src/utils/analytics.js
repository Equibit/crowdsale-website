import $ from 'jquery'

$.getScript('//www.google-analytics.com/analytics.js')
window.ga = window.ga || function () {
  (window.ga.q = window.ga.q || []).push(arguments)
}
window.ga.l = +new Date()
window.ga('create', 'UA-106618490-1', 'auto')
window.ga('send', 'pageview')

export default function trackEvent (category, action) {
  window.ga('send', 'event', category, action)
}
