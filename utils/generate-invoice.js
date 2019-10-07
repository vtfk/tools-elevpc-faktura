(async () => {
  const { writeFile } = require('fs').promises
  const setupInvoice = require('../lib/setup-invoice')
  const logger = require('../lib/logger')
  const students = require('../data/recipients.json')
  const invoices = students.map(setupInvoice)
  await writeFile('data/invoices.json', JSON.stringify(invoices, null, 2), 'utf-8')
  logger('info', ['utils', 'generate-invoice', 'finished'])
})()
