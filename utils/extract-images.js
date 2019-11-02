(async () => {
  const tesseract = require('node-tesseract-ocr')
  const { writeFile } = require('fs').promises
  const fileNames = [
    'nullstilles-01',
    'nullstilles-02',
    'nullstilles-03',
    'nullstilles-04'
  ]
  const config = {
    lang: 'eng',
    oem: 1,
    psm: 3
  }
  const getLines = async fileName => {
    const data = await tesseract.recognize(`data/${fileName}.png`, config)
    const lines = data.split('\n')
      .filter(line => /^\d/.test(line))
      .filter(line => line.split(' ').length === 9)
      .map(line => line.split(' ')[2]).map(num => num.replace('.', ''))
    return lines
  }
  const jobs = fileNames.map(fileName => getLines(fileName))
  const results = await Promise.all(jobs)
  const data = [].concat(...results)
  await writeFile('data/nullstilles.json', JSON.stringify(data, null, 2), 'utf-8')
  console.log(data)
  console.log('finished')
})()
