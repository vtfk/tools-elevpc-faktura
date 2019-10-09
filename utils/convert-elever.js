(async () => {
  const { writeFile } = require('fs').promises
  const csv = require('csvtojson')
  const logger = require('../lib/logger')
  const data = []
  let elever = await csv().fromFile('data/elever.csv')
  let larlinger = await csv().fromFile('data/larlinger.csv')
  logger('info', ['tools', 'convert-elever', 'got', elever.length, 'elever'])
  logger('info', ['tools', 'convert-elever', 'got', larlinger.length, 'larlinger'])
  elever = elever.map(elev => Object.assign({}, elev, { studentType: 'elev' }))
  larlinger = larlinger.map(larling => Object.assign({}, larling, { studentType: 'larling' }))
  data.push(...elever)
  data.push(...larlinger)
  logger('info', ['tools', 'convert-elever', 'got', data.length, 'students'])
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
