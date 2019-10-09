(async () => {
  const { writeFile } = require('fs').promises
  const csv = require('csvtojson')
  const recipients = require('../data/recipients.json')
  const logger = require('../lib/logger')
  const elever = await csv().fromFile('data/elever.csv')
  const larlinger = await csv().fromFile('data/larlinger.csv')
  const elevIds = elever.map(elev => elev.fnr)
  const larlingIds = larlinger.map(larling => larling.fnr)
  logger('info', ['utils', 'add-student-type', 'got', elever.length, 'elever'])
  logger('info', ['utils', 'add-student-type', 'got', elevIds.length, 'elevIds'])
  logger('info', ['utils', 'add-student-type', 'got', larlinger.length, 'larlinger'])
  logger('info', ['utils', 'add-student-type', 'got', larlingIds.length, 'larlingIds'])
  logger('info', ['utils', 'add-student-type', 'got', recipients.length, 'recipients'])

  const data = recipients.reduce((accumulator, current) => {
    const studentType = elevIds.includes(current.fnr) ? 'elev' : larlingIds.includes(current.fnr) ? 'larling' : 'ukjent'
    accumulator.push({ ...current, studentType })
    return accumulator
  }, [])
  logger('info', ['utils', 'add-student-type', 'got', data.length, 'recipients with studentType'])
  await writeFile('data/new-recipients.json', JSON.stringify(data, null, 2), 'utf-8')
  await writeFile('data/new-recipients-copy.json', JSON.stringify(data, null, 2), 'utf-8')
  logger('info', ['utils', 'add-student-type', 'finished'])
})()
