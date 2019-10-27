(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const students = require('../data/errors-copy.json')
  const isValid = student => student.dsf && student.dsf.isValid === true
  logger('info', ['utils', 'errors-rerun', 'got', students.length, 'students'])
  const filteredStudents = students.filter(isValid)
  logger('info', ['utils', 'errors-rerun', 'got', filteredStudents.length, 'filtered students'])
  writeFile('data/reruns.json', JSON.stringify(filteredStudents, null, 2), 'utf-8')
  writeFile('data/reruns-copy.json', JSON.stringify(filteredStudents, null, 2), 'utf-8')
  logger('info', ['utils', 'errors-rerun', 'finished'])
})()
