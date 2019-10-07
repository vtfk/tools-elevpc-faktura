const schools = require('../data/skoler.json')
module.exports = id => {
  const school = schools.find(school => school.schoolId === id)
  return school || {}
}
