process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const axios = require('axios')
const generateToken = require('./generate-token')
const logger = require('./logger')

module.exports = async (fnr, method) => {
  const url = `${process.env.DSF_SERVICE_URL}/${method}`
  const token = generateToken(process.env.DSF_SERVICE_SECRET)
  const payload = {
    saksref: 'avtale-faktura',
    foedselsnr: fnr
  }
  axios.defaults.headers.common.Authorization = token
  logger('info', ['lib', 'get-dsf-data', 'lookup dsf', 'start'])
  try {
    const { data } = await axios.post(url, payload)
    logger('info', ['lib', 'get-dsf-data', 'lookup dsf', 'success'])
    return { ...data.RESULT, isValid: true }
  } catch (error) {
    logger('error', ['lib', 'get-dsf-data', error])
    return { isValid: false }
  }
}
