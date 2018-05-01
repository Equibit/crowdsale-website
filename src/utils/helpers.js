import stache from 'can-stache/helpers/core'
import moment from 'moment'

stache.addHelper('timestamp', ts => {
  if (ts) {
    if (!ts.toString().endsWith('000')) ts *= 1000
    let format = 'MMM D, YYYY'
    return moment(parseInt(ts)).format(format)
  } else return 'TBD'
})

stache.addHelper('timestampFromNow', ts => {
  if (!ts.toString().endsWith('000')) ts *= 1000
  if (ts) return moment(parseInt(ts)).fromNow()
  else return ''
})

stache.addHelper('timestampDetailed', ts => {
  if (ts) {
    if (!ts.toString().endsWith('000')) ts *= 1000
    let format = 'MMM Do YYYY, h:mm:ss a'
    return moment(parseInt(ts)).format(format)
  } else return 'TBD'
})

stache.addHelper('shorten', (s, l) => {
  if (s !== 'undefined' && s && s.length > l) return s.substr(0, l) + '...'
  else return s
})

stache.addHelper('numberFormat', num => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  if (parseFloat(num) < 0) {
    return '<span class="text-danger">' + formatter.format(num) + '</span>'
  } else return formatter.format(num)
})
