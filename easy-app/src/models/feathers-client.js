import jQuery from 'jquery';
import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import auth from 'feathers-authentication-client'
import hooks from 'feathers-hooks'
import loader from '@loader'

const feathersClient = feathers()
  .configure(rest(loader.serviceBaseURL).jquery(jQuery))
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage
  }))

export default feathersClient