const axios = require('axios')
const generateToken = require('./generate-token')
const logger = require('./logger')

module.exports = async fnr => {
  const token = generateToken(process.env.KRR_SERVICE_SECRET)
  axios.defaults.headers.common.Authorization = token
  logger('info', ['lib', 'get-krr-data', 'lookup krr', 'start'])
  try {
    const { data } = await axios.post(process.env.KRR_SERVICE_URL, [fnr])
    logger('info', ['lib', 'get-krr-data', 'lookup krr', 'success'])
    const kor = data.personer[0]
    if (kor && kor.reservasjon === 'NEI' && kor.status === 'AKTIV') {
      logger('info', ['lib', 'get-krr-data', 'returns data'])
      return {
        email: kor.kontaktinformasjon.epostadresse,
        mobile: kor.kontaktinformasjon.mobiltelefonnummer
      }
    } else {
      logger('error', ['lib', 'get-krr-data', 'something failed', JSON.stringify(kor, null, 2)])
      throw new Error('missing data')
    }
  } catch (error) {
    logger('error', ['lib', 'get-krr-data', error])
    throw error
  }
}
