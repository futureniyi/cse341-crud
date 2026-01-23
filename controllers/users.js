// controllers/users.js
const usersHome = (req, res) => {
  res.send('Users home page')
}

const usersAbout = (req, res) => {
  res.send('About users')
}

module.exports = { usersHome, usersAbout }
