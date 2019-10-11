(async () => {
  require('dotenv').config()
  const sleep = require('then-sleep')
  const { writeFile } = require('fs').promises
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const RU = process.env.MONGODB_COSMOS_RUS // RU limit in Azure
  const sleepTime = 1000
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  const invoices = require('../data/invoices-copy.json')
  const payloadLimit = RU * 30
  const getPayloadSize = payload => {
    return Buffer.byteLength(JSON.stringify(payload))
  }

  // Insert data
  logger('info', ['utils', 'import-invoices', 'invoices', invoices.length, 'start'])
  logger('info', ['utils', 'import-invoices', 'payload', 'limit', payloadLimit, 'start'])
  while (invoices.length > 0) {
    const payload = []
    while (getPayloadSize(payload) < payloadLimit && invoices.length > 0) {
      const item = invoices.pop()
      item.shrdKey = process.env.MONGODB_SHARD_KEY
      payload.push(item)
    }
    if (payload.length > 1) {
      const bonus = payload.pop()
      invoices.push(bonus)
    }
    logger('info', ['utils', 'import-invoices', 'payloads', payload.length, 'ready'])
    const result = await collection.insertMany(payload)
    logger('info', ['utils', 'import-invoices', 'payload', 'inserted', result])
    logger('info', ['utils', 'import-invoices', 'invoices', invoices.length, 'remains'])
    await writeFile('data/invoices-copy.json', JSON.stringify(invoices, null, 2), 'utf-8')
    await sleep(sleepTime)
  }

  logger('info', ['utils', 'import-invoices', 'finished'])
  process.exit(0)
})()
