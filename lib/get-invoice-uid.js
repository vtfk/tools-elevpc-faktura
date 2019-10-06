const axios = require('axios')
const getBirthdate = require('birthdate-from-id')
const getAge = require('get-age')
const generateToken = require('./generate-token')
const logger = require('./logger')

module.exports = async fnr => {
  let invoiceUid = false
  if (getAge(getBirthdate(fnr)) >= 18) {
    logger('info', ['lib', 'get-invoice-uid', 'over 18'])
    invoiceUid = fnr
  } else {
    axios.defaults.headers.common.Authorization = generateToken(process.env.AGREEMENT_SERVICE_SECRET)
    const payload = {
      uids: [fnr],
      type: 'elevpc'
    }
    logger('info', ['lib', 'get-invoice-uid', 'lookup agreements'])
    const { data } = await axios.post(process.env.AGREEMENT_SERVICE_URL, payload)
    if (data.length > 0) {
      logger('info', ['lib', 'get-invoice-uid', 'got invoice uid'])
      invoiceUid = data[0].sendInvoiceToUid
    } else {
      logger('info', ['lib', 'get-invoice-uid', 'no invoice uid found'])
    }
  }
  return invoiceUid
}
