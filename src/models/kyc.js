import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const Kyc = DefineMap.extend('Kyc', {
  id: 'any',
  firstName: 'string',
  middleName: 'string',
  lastName: 'string',
  gender: 'string',
  dayOfBirth: 'number',
  monthOfBirth: 'number',
  yearOfBirth: 'number',
  unitNumber: 'string',
  buildingNumber: 'string',
  streetName: 'string',
  streetType: 'string',
  addressLine: 'string',
  city: 'string',
  stateProvinceCode: 'string',
  postalCode: 'string',
  countryCode: 'string'
})

Kyc.List = DefineList.extend('KycList', {
  '#': Kyc
})

Kyc.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Kyc,
  List: Kyc.List,
  feathersService: feathersClient.service('kyc'),
  name: 'kyc',
  algebra
})

Kyc.algebra = algebra

export default Kyc
