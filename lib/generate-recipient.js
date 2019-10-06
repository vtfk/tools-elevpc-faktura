const resolveRecipient = require('./resolve-recipient')
const getKRR = require('./get-krr-data')
const logger = require('./logger')

module.exports = async student => {
  const { dsf } = student
  logger('info', ['lib', 'generate-recipient', 'start'])
  const recipient = resolveRecipient(dsf)
  if (recipient) {
    logger('info', ['lib', 'generate-recipient', 'got recipient', 'lookup krr'])
    try {
      const krr = await getKRR(recipient.personalIdNumber)
      logger('info', ['lib', 'generate-recipient', 'lookup krr', 'success'])
      return { ...recipient, ...krr }
    } catch (error) {
      logger('error', ['lib', 'generate-recipient', 'lookup krr', error])
      return false
    }
  } else {
    logger('info', ['lib', 'generate-recipient', 'no recipient', 'return false'])
    return recipient
  }
}
