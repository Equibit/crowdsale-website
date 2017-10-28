const emailRegex = /.+@.+\..+/i

export default {
  email (value, { allowEmpty }) {
    return (!allowEmpty && !value && 'Email is missing') ||
      (value && !emailRegex.test(value) && 'Enter a valid email address') || ''
  },
  password (value, { allowEmpty }) {
    return (!allowEmpty && !value && 'Password is missing') || ''
  },
  terms (value) {
    return (!value && 'You need to read and agree to our Terms of Service and Privacy Policy') || ''
  },
  notEmpty (value, { allowEmpty }) {
    return (!allowEmpty && !value && 'This field is required') || ''
  },
  ageValid (currentAge, countryCode, stateProvinceCode, dataArr) {
    let currentLimit = dataArr[0].age || 0
    let countryList = dataArr.filter(elem => elem.country === countryCode && !elem.stateProv)
    if (countryList.length > 0) {
      currentLimit = countryList[0].age
      let provStateList = countryList.filter(elem => elem.stateProv === stateProvinceCode)
      if (provStateList.length > 0) {
        currentLimit = provStateList[0].age
      }
    }
    return currentAge >= currentLimit
  }
}
