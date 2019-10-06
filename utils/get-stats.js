(async () => {
  const logger = require('../lib/logger')
  const elever = require('../data/elever-with-invoice-uid.json')
  logger('info', ['utils', 'get-stats', 'got', elever.length, 'students'])
  const nouid = elever.filter(elev => elev.invoiceUid === false)
  const selfuid = elever.filter(elev => elev.fnr === elev.invoiceUid)
  logger('info', ['utils', 'get-stats', 'got', nouid.length, 'students without invoiceUid'])
  logger('info', ['utils', 'get-stats', 'got', selfuid.length, 'students with theireselves as invoiceUid'])
})()
