const express = require ('express')
const app = express()

const port = process.env.PORT || 3000

const morgan = require('morgan')
const router = require('./config/routes')
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', router)
app.use('/candies', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app // we need to add this so that we can run tests in codeship
