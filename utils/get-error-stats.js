(async () => {
  const isFnr = require('is-valid-fodselsnummer')
  const logger = require('../lib/logger')
  const errors = require('../data/errors.json')
  const isValidStats = data => {
    let status = false
    if (data.dsf && data.dsf.HOV && data.dsf.HOV['STAT-KD'].toString() === '1' && data.dsf.HOV['SPES-KD'].toString() === '0') {
      status = true
    }
    return status
  }
  const isValidFnr = data => {
    return isFnr(data.fnr, true) === 'F'
  }
  logger('info', ['utils', 'get-error-stats', 'got', errors.length, 'errors'])
  const validFnrs = errors.filter(isValidFnr)
  logger('info', ['utils', 'get-error-stats', 'got', validFnrs.length, 'valid fnrs'])
  const validStatus = errors.filter(isValidStats)
  logger('info', ['utils', 'get-error-stats', 'got', validStatus.length, 'valid statuses'])
})()
