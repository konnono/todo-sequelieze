const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('./node_modules/body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const app = express()
const routes = require('./routes')
const usePassport = require('./config/passport')

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

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port:${process.env.PORT}`)
})