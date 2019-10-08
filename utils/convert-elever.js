(async () => {
  const { writeFile } = require('fs').promises
  const csv = require('csvtojson')
  const logger = require('../lib/logger')
  const data = await csv().fromFile('data/elever.csv')
  logger('info', ['tools', 'convert-elever', 'got', data.length, 'elever'])
  await writeFile('data/elever.json', JSON.stringify(data, null, 2), 'utf-8')
  await writeFile('data/elever-copy.json', JSON.stringify(data, null, 2), 'utf-8')
  logger('info', ['tools', 'convert-elever', 'file saved'])
  logger('info', ['tools', 'convert-elever', 'finished'])
})()
