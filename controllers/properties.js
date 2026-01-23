// controllers/properties.js
const propertiesHome = (req, res) => {
  res.send('Properties home page')
}

const propertiesAbout = (req, res) => {
  res.send('About properties')
}

module.exports = { propertiesHome, propertiesAbout }