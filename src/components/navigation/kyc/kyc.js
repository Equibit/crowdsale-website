import $ from 'jquery'
import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import './kyc.less'
import view from './kyc.stache'
import countryData from './data/country'
import monthsData from './data/months'
import streetTypeData from './data/street-types'
import provStateData from './data/provinces-states'
import ageRestriction from './data/age-restriction'
import moment from 'moment'
import 'bootstrap-select'
import validate from '~/utils/validators'
import User from '~/models/user'
import Kyc from '~/models/kyc'

export const ViewModel = DefineMap.extend({
  startYear: {
    value: 1940
  },
  countYears: {
    value: 77
  },
  dropDownSize: {
    value: 12
  },
  currentUser: {
    Type: User
  },
  session: {
    type: 'any'
  },
  countryList: {
    Type: DefineList,
    value () {
      return countryData
    }
  },
  provStateListData: {
    Type: DefineList,
    value () {
      return provStateData
    }
  },
  provStateList: {
    Type: DefineList,
    set (val) {
      this.provStateListHidden = val.length <= 0
      return val
    }
  },
  countryListSearch: {
    get () {
      return (this.countryList.length > this.dropDownSize)
    }
  },
  monthsList: {
    Type: DefineList,
    value () {
      return monthsData
    }
  },
  streetTypeList: {
    Type: DefineList,
    value () {
      return streetTypeData
    }
  },
  daysOfMonthList: {
    get () {
      return new DefineList(new Array(31).fill(0).map((v, i) => i + 1))
    }
  },
  yearsList: {
    get () {
      return new DefineList(new Array(this.countYears).fill(0).map((v, i) => i + this.startYear))
    }
  },
  provStateListHidden: {
    value: true,
    set (val) {
      if (val) $('#kyc-province-state-select').selectpicker('hide')
      else $('#kyc-province-state-select').selectpicker('show')
      return val
    }
  },
  disableForm: 'boolean',
  processing: 'boolean',
  firstName: {
    type: 'string',
    set (val) {
      this.firstNameError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  firstNameError: 'string',
  middleName: 'string',
  lastName: 'string',
  gender: 'string',
  dayOfBirth: 'number',
  monthOfBirth: 'number',
  yearOfBirth: 'number',
  dayOfBirthString: {
    get () {
      let s = '0' + this.dayOfBirth
      return s.substr(s.length - 2)
    }
  },
  monthOfBirthString: {
    get () {
      let s = '0' + this.monthOfBirth
      return s.substr(s.length - 2)
    }
  },
  identityAge: {
    get () {
      return (this.yearOfBirth && this.monthOfBirth && this.dayOfBirth
        ? moment().diff(moment(this.yearOfBirth + '' + this.monthOfBirthString + '' + this.dayOfBirthString, 'YYYYMMDD'), 'years')
        : 0)
    }
  },
  unitNumber: 'string',
  buildingNumber: {
    type: 'string',
    set (val) {
      this.buildingNumberError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  buildingNumberError: 'string',
  streetName: {
    type: 'string',
    set (val) {
      this.streetNameError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  streetNameError: 'string',
  streetType: 'string',
  addressLine: 'string',
  city: {
    type: 'string',
    set (val) {
      this.cityError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  cityError: 'string',
  stateProvinceCode: {
    type: 'string',
    set (val) {
      this.stateProvinceCodeError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  stateProvinceCodeError: 'string',
  postalCode: {
    type: 'string',
    set (val) {
      this.postalCodeError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  postalCodeError: 'string',
  countryCode: {
    type: 'string',
    set (val) {
      this.countryCodeError = validate.notEmpty(val, {allowEmpty: 1})
      return val
    }
  },
  countryCodeError: 'string',
  hasErrors: {
    get () {
      this.firstNameError = validate.notEmpty(this.firstName, {allowEmpty: 0})
      this.buildingNumberError = validate.notEmpty(this.buildingNumber, {allowEmpty: 0})
      this.streetNameError = validate.notEmpty(this.streetName, {allowEmpty: 0})
      this.cityError = validate.notEmpty(this.city, {allowEmpty: 0})
      this.stateProvinceCodeError = validate.notEmpty(this.stateProvinceCode, {allowEmpty: 0})
      this.postalCodeError = validate.notEmpty(this.postalCode, {allowEmpty: 0})
      this.countryCodeError = validate.notEmpty(this.countryCode, {allowEmpty: 0})
      return this.firstNameError || this.buildingNumberError || this.streetNameError || this.stateProvinceCodeError || this.postalCodeError || this.countryCodeError || this.cityError
    }
  },
  clearForm () {
    this.processing = false
    this.disableForm = false
    this.firstName = null
    this.firstNameError = null
    this.middleName = null
    this.lastName = null
    this.gender = null
    this.dayOfBirth = 1
    this.monthOfBirth = 1
    this.yearOfBirth = this.startYear
    this.unitNumber = null
    this.buildingNumber = null
    this.buildingNumberError = null
    this.streetName = null
    this.streetNameError = null
    this.streetType = null
    this.addressLine = null
    this.city = null
    this.cityError = null
    this.postalCode = null
    this.postalCodeError = null
    this.stateProvinceCode = null
    this.stateProvinceCodeError = null
    this.countryCode = null
    this.countryCodeError = null
    this.provStateListHidden = false
    this.provStateList = new DefineList()
    $('#kyc-province-state-select').selectpicker('show')
    $('.bootstrap-select').trigger('reset-select-picker')
    $('#kyc-modal').modal('hide')
  },
  populateProvState (newCountryCode) {
    this.provStateList = this.provStateListData.filter(elem => elem.country === newCountryCode)
    setTimeout(() => $('#kyc-province-state-select').trigger('reset-select-picker'), 300)
  },
  handleKYC (ev) {
    ev.preventDefault()
    if (this.hasErrors) return false
    this.processing = true
    this.disableForm = true
    let $bs = $('.bootstrap-select')
    $bs.trigger('reset-select-picker')

    let validAge = validate.ageValid(this.identityAge, this.countryCode, this.stateProvinceCode, ageRestriction)

    if (validAge) {
      let sendObj = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        gender: this.gender,
        dayOfBirth: this.dayOfBirth,
        monthOfBirth: this.monthOfBirth,
        yearOfBirth: this.yearOfBirth,
        unitNumber: this.unitNumber,
        buildingNumber: this.buildingNumber,
        streetName: this.streetName,
        streetType: this.streetType,
        addressLine: this.addressLine,
        city: this.city,
        stateProvinceCode: this.stateProvinceCode,
        postalCode: this.postalCode,
        countryCode: this.countryCode
      }

      Kyc(sendObj)
        .save()
        .then(() => {
          this.processing = false
          this.disableForm = false
          this.session.kycComplete = true
        })
        .catch(err => {
          this.disableForm = false
          this.processing = false
          $bs.trigger('reset-select-picker')

          if (err.status === 401) this.session.error401()
          else console.log(err)
        })
    } else {
      this.disableForm = false
      this.processing = false
      $bs.trigger('reset-select-picker')
    }
  }
})

export default Component.extend({
  tag: 'kyc-modal',
  ViewModel,
  view,
  events: {
    inserted: function () {
      $('[data-toggle="popover"]').popover()
    }
  }
})
