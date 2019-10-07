const getSchoolInfo = require('tfk-schools-info')
const codes = require('../data/pccodes.json')

module.exports = student => {
  const { fornavn, etternavn, enhet, pckode, basisgruppe } = student
  console.log(enhet)
  const schools = getSchoolInfo({ shortName: enhet })
  console.log(schools)
  const school = schools[0]
  const { officialName, phoneNumber } = school
  const pc = codes[pckode]
  const { amount, partNumber, notes } = pc
  const notes1 = notes
  const notes2 = `${fornavn} ${etternavn}, ${basisgruppe}, ${officialName}, telefon: ${phoneNumber}`
  return {
    partNumber,
    amount,
    notes1,
    notes2
  }
}
