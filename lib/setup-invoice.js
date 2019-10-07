const shorten = require('./shorten')
const generateInvoiceData = require('./generate-invoice-data')

module.exports = student => {
  const { recipient } = student
  const { personalIdNumber, fullName, address, zip, city, email, mobile } = recipient
  const invoiceData = generateInvoiceData(student)
  const { partNumber, amount, notes1, notes2 } = invoiceData

  return {
    id: personalIdNumber,
    name: shorten(fullName),
    address1: shorten(address),
    addresse2: '',
    zip: zip,
    city: city,
    mobile: mobile || '',
    email: email || '',
    partNumber: partNumber,
    amount: amount,
    qty: 1,
    notes1,
    notes2
  }
}
