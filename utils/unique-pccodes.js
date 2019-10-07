(async () => {
  const students = require('../data/elever.json')
  const codes = students.reduce((accumulator, current) => {
    if (!accumulator.includes(current.pckode)) {
      accumulator.push(current.pckode)
    }
    return accumulator
  }, [])
  console.log(JSON.stringify(codes, null, 2))
})()
