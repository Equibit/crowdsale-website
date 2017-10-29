import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const KYC = DefineMap.extend('KYC', {
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

KYC.List = DefineList.extend({
  '#': KYC
})

KYC.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: KYC,
  List: KYC.List,
  feathersService: feathersClient.service('kyc'),
  name: 'kyc',
  algebra
})

KYC.algebra = algebra

export default KYC
