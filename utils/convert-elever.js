(async () => {
  const { writeFile } = require('fs').promises
  const csv = require('csvtojson')
  const logger = require('../lib/logger')
  const data = await csv().fromFile('data/elever.csv')
  logger('info', ['tools', 'convert-elever', 'got', data.length, 'elever'])
  const duplicates = []
  const uniques = data.reduce((accumulator, current) => {
    const fnrs = accumulator.map(item => item.fnr)
    if (!fnrs.includes(current.fnr)) {
      accumulator.push(current)
    } else {
      duplicates.push(current)
    }
    return accumulator
  }, [])
  logger('info', ['tools', 'convert-elever', 'got', uniques.length, 'unique students'])
  logger('info', ['tools', 'convert-elever', 'got', duplicates.length, 'duplicates'])
  await writeFile('data/elever.json', JSON.stringify(uniques, null, 2), 'utf-8')
  await writeFile('data/elever-copy.json', JSON.stringify(uniques, null, 2), 'utf-8')
  logger('info', ['tools', 'convert-elever', 'file saved'])
  logger('info', ['tools', 'convert-elever', 'finished'])
})()
