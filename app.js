const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('./node_modules/body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const app = express()
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

const usePassport = require('./config/passport')
usePassport(app)
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port:${process.env.PORT}`)
})