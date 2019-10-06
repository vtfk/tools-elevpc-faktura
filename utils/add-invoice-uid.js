(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const getInvoiceUID = require('../lib/get-invoice-uid')
  const elever = require('../data/elever.json')
  const logger = require('../lib/logger')
  const data = []
  while (elever.length > 0) {
    logger('info', ['utils', 'add-invoice-uid', 'got', elever.length, 'students left'])
    const student = elever.pop()
    const invoiceUid = await getInvoiceUID(student.fnr)
    data.push({ ...student, invoiceUid })
  }
  logger('info', ['utils', 'add-invoice-uid', 'got', data.length, 'students with invoice uid'])
  await writeFile('data/elever-with-invoice-uid.json', JSON.stringify(data, null, 2), 'utf-8')
  await writeFile('data/elever-with-invoice-uid-copy.json', JSON.stringify(data, null, 2), 'utf-8')
  logger('info', ['utils', 'add-invoice-uid', 'finished'])
})()
