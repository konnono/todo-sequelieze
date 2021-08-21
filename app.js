const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('./node_modules/body-parser')
const methodOverride = require('method-override')

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main', extname: '.hbs'
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port:${process.env.PORT}`)
})