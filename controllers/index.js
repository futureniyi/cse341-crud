const homeRoute = (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send(req.session.user ? `Logged In as ${req.session.user.displayName}` : 'Logged Out')
}

module.exports = { homeRoute }
