const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://whispering-headland-44360.herokuapp.com',
      changeOrigin: true
    })
  )
}
