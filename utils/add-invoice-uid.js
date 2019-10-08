(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const getInvoiceUID = require('../lib/get-invoice-uid')
  const logger = require('../lib/logger')
  let data = []
  let elever = []
  try {
    const requiredData = require('../data/elever-with-invoice-uid.json')
    data = requiredData
    logger('info', ['utils', 'add-invoice-uid', 'got', 'data'])
  } catch (error) {
    logger('warn', ['utils', 'add-invoice-uid', 'no data found'])
  }
  try {
    const requiredElevData = require('../data/elever-copy.json')
    elever = requiredElevData
    logger('info', ['utils', 'add-invoice-uid', 'got', 'students'])
  } catch (error) {
    logger('warn', ['utils', 'add-invoice-uid', 'no students found'])
  }
  while (elever.length > 0) {
    logger('info', ['utils', 'add-invoice-uid', 'got', elever.length, 'students left'])
    const student = elever.pop()
    const invoiceUid = await getInvoiceUID(student.fnr)
    data.push({ ...student, invoiceUid })
    await writeFile('data/elever-with-invoice-uid.json', JSON.stringify(data, null, 2), 'utf-8')
    await writeFile('data/elever-copy.json', JSON.stringify(elever, null, 2), 'utf-8')
  }
  logger('info', ['utils', 'add-invoice-uid', 'got', data.length, 'students with invoice uid'])
  await writeFile('data/elever-with-invoice-uid.json', JSON.stringify(data, null, 2), 'utf-8')
  await writeFile('data/elever-with-invoice-uid-copy.json', JSON.stringify(data, null, 2), 'utf-8')
  logger('info', ['utils', 'add-invoice-uid', 'finished'])
})()
