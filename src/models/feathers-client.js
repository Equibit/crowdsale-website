import jQuery from 'jquery'
import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import auth from 'feathers-authentication-client'
import hooks from 'feathers-hooks'
import environment from '~/environment'
const { apiUrl, useXhrTransport } = environment

const transport = useXhrTransport ? 'rest' : 'socketio'

const feathersClient = feathers()

if (transport === 'socketio') {
  const socket = io(apiUrl, {
    transports: ['websocket']
  })
  feathersClient.configure(socketio(socket, {timeout: 60000}))
} else {
  feathersClient.configure(rest(apiUrl).jquery(jQuery))
}

feathersClient
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage
  }))

export default feathersClient
