const jwt = require('jsonwebtoken')
const { name: system, version } = require('../package.json')

module.exports = secret => {
  const payload = {
    system,
    version
  }

  const options = {
    expiresIn: '1m',
    issuer: 'https://auth.t-fk.no'
  }

  return `Bearer ${jwt.sign(payload, secret, options)}`
}
