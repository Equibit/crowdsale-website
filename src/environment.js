let hostname = window.location.hostname
let proto = window.location.protocol
// let host = hostname === 'localhost' ? 'localhost:3030' : `${hostname}`.replace('eqb.', 'api.')
let host = hostname === 'localhost' ? 'localhost:3030' : `${hostname}`.replace('website', 'api')

// Heroku DNS:
// https://qa-crowdsale-website.herokuapp.com/
// https://qa-crowdsale-api.herokuapp.com/

export default {
  apiUrl: `${proto}//${host}`,
  isLocal: hostname === 'localhost',
  useXhrTransport: window.useXhrTransport
}
