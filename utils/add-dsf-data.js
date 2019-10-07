(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const isValidFnr = require('is-valid-fodselsnummer')
  const sleep = require('then-sleep')
  const getDsfData = require('../lib/get-dsf-data')
  const logger = require('../lib/logger')
  let data = []
  let elever = []
  let errors = []
  try {
    const requiredData = require('../data/elever-with-dsf-data.json')
    data = requiredData
    logger('info', ['utils', 'add-dsf-data', 'got', 'data'])
  } catch (error) {
    logger('warn', ['utils', 'add-dsf-data', 'no data found'])
  }
  try {
    const requiredElevData = require('../data/elever-with-invoice-uid-copy.json')
    elever = requiredElevData
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
  logger('info', ['utils', 'add-dsf-data', 'got', data.length, 'data'])
  logger('info', ['utils', 'add-dsf-data', 'got', elever.length, 'students'])
  logger('info', ['utils', 'add-dsf-data', 'got', errors.length, 'errors'])
  while (elever.length > 0) {
    const student = elever.pop()
    logger('info', ['utils', 'add-dsf-data', 'got student', `${student.invoiceUid ? 'with invoice uid' : 'no invoice uid'}`])
    if (student.invoiceUid) {
      if (isValidFnr(student.invoiceUid) && isValidFnr(student.invoiceUid, true) === 'F') {
        logger('warn', ['utils', 'add-dsf-data', 'get dsfdata from invoiceUid'])
        const dsf = await getDsfData(student.invoiceUid, 'hentDetaljer')
        if (dsf.isValid) {
          logger('warn', ['utils', 'add-dsf-data', 'got dsf data'])
          data.push({ ...student, dsf })
        } else {
          logger('warn', ['utils', 'add-dsf-data', 'got problem', 'invalid dsf data'])
          errors.push({ ...student, dsf })
        }
      } else {
        logger('warn', ['utils', 'add-dsf-data', 'got problem', 'invalid invoiceUid', 'skipping'])
        const isValid = isValidFnr(student.invoiceUid)
        errors.push({ ...student, isValid })
      }
    } else if (isValidFnr(student.fnr) && isValidFnr(student.fnr, true) === 'F') {
      logger('warn', ['utils', 'add-dsf-data', 'get dsf data from students fnr'])
      const dsf = await getDsfData(student.fnr, 'hentForeldre')
      if (dsf.isValid) {
        logger('warn', ['utils', 'add-dsf-data', 'dsf data ok'])
        data.push({ ...student, dsf })
      } else {
        logger('warn', ['utils', 'add-dsf-data', 'got problem', 'invalid dsf'])
        errors.push({ ...student, dsf })
      }
    } else {
      logger('warn', ['utils', 'add-dsf-data', 'got problem', 'skipping'])
      const isValid = isValidFnr(student.fnr)
      errors.push({ ...student, isValid })
    }
    await writeFile('data/elever-with-dsf-data.json', JSON.stringify(data, null, 2), 'utf-8')
    await writeFile('data/elever-with-dsf-data-copy.json', JSON.stringify(data, null, 2), 'utf-8')
    await writeFile('data/elever-with-invoice-uid-copy.json', JSON.stringify(elever, null, 2), 'utf-8')
    await writeFile('data/errors.json', JSON.stringify(errors, null, 2), 'utf-8')
    logger('info', ['utils', 'add-dsf-data', 'going to sleep'])
    await sleep(4000)
    logger('info', ['utils', 'add-dsf-data', 'got', elever.length, 'students'])
  }
  logger('info', ['utils', 'add-dsf-data', 'finished'])
})()
