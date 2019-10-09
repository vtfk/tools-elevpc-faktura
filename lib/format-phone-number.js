module.exports = number => {
  number = number.toString()
  const start = number.startsWith('47') ? 2 : 0
  return `${number.substr(start, 2)} ${number.substr(start + 2, 2)} ${number.substr(start + 4, 2)} ${number.substr(start + 6, 2)}`
}
