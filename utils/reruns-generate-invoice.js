(async () => {
  const { writeFile } = require('fs').promises
  const setupInvoice = require('../lib/setup-invoice')
  const logger = require('../lib/logger')
  const students = require('../data/reruns-recipients.json')
  const elever = require('../data/elever.json')
  const uidStatuses = elever.reduce((accumulator, current) => {
    accumulator[current.fnr] = current.studentType
    return accumulator
  }, {})
  const enrichedStudents = students.map(student => Object.assign({}, student, { studentType: uidStatuses[student.fnr] }))
  const invoices = enrichedStudents.map(setupInvoice)
  await writeFile('data/reruns-invoices.json', JSON.stringify(invoices, null, 2), 'utf-8')
  await writeFile('data/reruns-invoices-copy.json', JSON.stringify(invoices, null, 2), 'utf-8')
  logger('info', ['utils', 'generate-invoice', 'finished'])
})()
