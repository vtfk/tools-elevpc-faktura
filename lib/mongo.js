const MongoClient = require('mongodb').MongoClient
const logger = require('./logger')

const uri = process.env.MONGODB_CONNECTION
const dbName = process.env.MONGODB_NAME

let cachedDb = null

module.exports = async () => {
  if (cachedDb) {
    logger('info', ['mongo', 'client connected', 'quick return'])
    return cachedDb
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  const db = await client.db(dbName)

  cachedDb = db
  logger('info', ['mongo', 'new client connected'])
  return db
}
