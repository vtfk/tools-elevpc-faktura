const test = require('ava')
const shortenName = require('../lib/shorten-name')

test('It does nothing if short name', t => {
  const name = 'Bob Bob Bobsson'
  t.deepEqual(shortenName(name), name, 'Short name ok')
})

test('It changes Foresatte til to Foresatte', t => {
  const name = 'Foresatte til Bob Bob Bobsson Bobsson Bob'
  const expectedName = 'Foresatte Bob Bob Bobsson Bobsson Bob'
  t.deepEqual(shortenName(name), expectedName, 'Changes Foresatte ok')
})

test('It changes Foresatte til to Foresatte and shortens name', t => {
  const name = 'Foresatte til Bobsson Bob Bob Bobsson Bobsson Bob'
  const expectedName = 'Foresatte B Bob Bob Bobsson Bobsson Bob'
  t.deepEqual(shortenName(name), expectedName, 'Changes Foresatte and name ok')
})

test('It shortens name', t => {
  const name = 'Bobsson Bob Bob Bobsson Bobsson Bob Bobsson'
  const expectedName = 'B Bob Bob Bobsson Bobsson Bob Bobsson'
  t.deepEqual(shortenName(name), expectedName, 'Shortens name ok')
})
