(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const sleep = require('then-sleep')
  const logger = require('../lib/logger')
  const generateRecipient = require('../lib/generate-recipient')
  let students = []
  let data = []
  let errors = []
  try {
    const requiredData = require('../data/recipients.json')
    data = requiredData
    logger('info', ['utils', 'add-dsf-data', 'got', 'data'])
  } catch (error) {
    logger('warn', ['utils', 'add-dsf-data', 'no data found'])
  }
  try {
    const requiredElevData = require('../data/elever-with-dsf-data-copy.json')
    students = requiredElevData
    logger('info', ['utils', 'add-dsf-data', 'got', 'students'])
  } catch (error) {
    logger('warn', ['utils', 'add-dsf-data', 'no students found'])
  }
  try {
    const requiredErrorData = require('../data/errors.json')
    errors = requiredErrorData
    logger('info', ['utils', 'add-dsf-data', 'got', 'errors'])
  } catch (error) {
    logger('warn', ['utils', 'add-dsf-data', 'no errors found'])
  }
  logger('info', ['utils', 'add-recipient', 'got', students.length, 'students'])
  while (students.length > 0) {
    const student = students.pop()
    logger('info', ['utils', 'add-recipient', 'generate recipient', 'start'])
    try {
      const recipient = await generateRecipient(student)
      if (recipient) {
        logger('info', ['utils', 'add-recipient', 'generate recipient', 'success'])
        delete student.dsf
        data.push({ ...student, recipient })
      } else {
        logger('warn', ['utils', 'add-recipient', 'generate recipient', 'failed'])
        errors.push(student)
      }
    } catch (error) {
      logger('error', ['utils', 'add-recipient', error])
      errors.push(student)
    }
    await writeFile('data/recipients.json', JSON.stringify(data, null, 2), 'utf-8')
    await writeFile('data/recipients-copy.json', JSON.stringify(data, null, 2), 'utf-8')
    await writeFile('data/elever-with-dsf-data-copy.json', JSON.stringify(students, null, 2), 'utf-8')
    await writeFile('data/errors.json', JSON.stringify(errors, null, 2), 'utf-8')
    logger('info', ['utils', 'add-recipient', 'a quick nap'])
    await sleep(1000)
    logger('info', ['utils', 'add-recipient', 'got', students.length, 'students'])
  }
  logger('info', ['utils', 'add-recipient', 'got', data.length, 'recipients'])
  logger('info', ['utils', 'add-recipient', 'Finished'])
})()
