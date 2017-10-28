let hostname = window.location.hostname
let proto = window.location.protocol
let host = hostname === 'localhost' ? 'localhost:3030' : `api-${hostname}`

export default {
  apiUrl: `${proto}//${host}`,
  isLocal: hostname === 'localhost',
  useXhrTransport: true // window.useXhrTransport
}
