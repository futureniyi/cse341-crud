const homeRoute = (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send('Home page')
}

module.exports = { homeRoute }