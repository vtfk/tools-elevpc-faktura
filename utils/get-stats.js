(async () => {
  const logger = require('../lib/logger')
  const elever = require('../data/elever-with-invoice-uid.json')
  const errors = require('../data/errors.json')
  const dsf = require('../data/elever-with-dsf-data.json')
  const recipients = require('../data/recipients.json')
  logger('info', ['utils', 'get-stats', 'got', elever.length, 'students'])
  const nouid = elever.filter(elev => elev.invoiceUid === false)
  const selfuid = elever.filter(elev => elev.fnr === elev.invoiceUid)
  const students = require('../data/elever.json')
  const codes = students.reduce((accumulator, current) => {
    if (!Object.keys(accumulator).includes(current.pckode)) {
      accumulator[current.pckode] = 0
    }
    accumulator[current.pckode]++
    return accumulator
  }, {})
  const schools = students.reduce((accumulator, current) => {
    if (!Object.keys(accumulator).includes(current.enhet)) {
      accumulator[current.enhet] = 0
    }
    accumulator[current.enhet]++
    return accumulator
  }, {})
  logger('info', ['utils', 'get-stats', 'got', nouid.length, 'students without invoiceUid'])
  logger('info', ['utils', 'get-stats', 'got', selfuid.length, 'students with theireselves as invoiceUid'])
  logger('info', ['utils', 'get-stats', 'got', dsf.length, 'students with dsf data'])
  logger('info', ['utils', 'get-stats', 'got', recipients.length, 'recipients'])
  logger('info', ['utils', 'get-stats', 'got', errors.length, 'students with errors'])
  logger('info', ['utils', 'get-stats', 'pc-codes', JSON.stringify(codes, null, 2)])
  logger('info', ['utils', 'get-stats', 'schools', JSON.stringify(schools, null, 2)])
})()
