const getSchool = require('./get-school')
const formatPhoneNumber = require('./format-phone-number')
const codes = require('../data/pccodes.json')

module.exports = student => {
  const { fornavn, etternavn, enhet, pckode, basisgruppe, studentType } = student
  const school = getSchool(enhet)
  const { name: schoolName, phone: schoolPhone } = school
  const pc = codes[pckode]
  const { amount } = pc
  const partNumber = studentType === 'elev' ? 106 : 107
  let notes1 = `Leie av PC skoleåret 2019/2020 ${fornavn} ${etternavn}, ${basisgruppe}, ${schoolName}`
  let notes2 = `Dersom noe ikke stemmer, ta kontakt med skolen: ${formatPhoneNumber(schoolPhone)}`
  if (studentType === 'larling') {
    notes1 = `Siste betaling leie av PC ${fornavn} ${etternavn}, ${basisgruppe}, ${schoolName}`
    notes2 = `Dersom noe ikke stemmer, ta kontakt med skolen: ${formatPhoneNumber(schoolPhone)}`
  }
  return {
    partNumber,
    amount,
    notes1,
    notes2
  }
}
