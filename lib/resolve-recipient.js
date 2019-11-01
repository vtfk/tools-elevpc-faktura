const normalize = require('tfk-dsf-normalize-contact')
const birthday = require('birthdate-from-id')
const getAge = require('get-age')
const getParents = require('./get-parents')

module.exports = dsf => {
  const { HOV, FOR } = dsf
  const main = normalize(HOV)
  const isSameAddress = data => data.address === main.address && data.zip === main.zip && data.city === main.city
  const parents = FOR ? getParents(dsf).map(normalize).filter(isSameAddress) : false
  const parent = parents && parents.length > 0 ? parents[0] : false
  return getAge(birthday(main.personalIdNumber)) >= 18 ? main : parent !== false ? parent : main
}
