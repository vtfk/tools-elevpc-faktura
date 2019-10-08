const getSchool = require('./get-school')
const codes = require('../data/pccodes.json')

module.exports = student => {
  const { fornavn, etternavn, enhet, pckode, basisgruppe } = student
  const school = getSchool(enhet)
  const { name: schoolName, phone: schoolPhone } = school
  const pc = codes[pckode]
  const { amount, partNumber } = pc
  const notes1 = `Leie av PC ${fornavn} ${etternavn}, ${basisgruppe}, ${schoolName}`
  const notes2 = `Dersom noe ikke stemmer, ta kontakt med skolen på telefon: ${schoolPhone}`
  return {
    partNumber,
    amount,
    notes1,
    notes2
  }
}
