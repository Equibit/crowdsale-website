let hostname = window.location.hostname
let proto = window.location.protocol
let host = hostname === 'localhost' ? 'localhost:3030' : `${hostname}`.replace('eqb.', 'api.')

export default {
  apiUrl: `${proto}//${host}`,
  isLocal: hostname === 'localhost',
  useXhrTransport: window.useXhrTransport
}
