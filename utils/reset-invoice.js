(async () => {
  require('dotenv').config()
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const resetIds = require('../data/nullstilles.json')
  const shrdKey = process.env.MONGODB_SHARD_KEY
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['utils', 'reset-invoice', 'got ', resetIds.length, 'invoices to reset'])
  const query = {
    id: { $in: resetIds },
    batchId: { $exists: true },
    shrdKey
  }
  const data = await collection.find(query).toArray()
  logger('info', ['utils', 'reset-invoice', 'got ', data.length, 'invoices on record'])
  const ids = data.map(record => record._id)
  await collection.updateMany({ _id: { $in: ids }, shrdKey }, { $unset: { batchId: '' } })
  logger('info', ['utils', 'reset-invoice', 'got ', data.length, 'removed from batch'])
  process.exit(0)
})()
