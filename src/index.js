const express = require('express')
const hbs = require('express-handlebars')
const router = require('./routes')

const app = express()

app.use('/static', express.static('static'))

app.use(express.urlencoded({extended: false}))

app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(router)

app.listen(5000, () => console.log('Server started on port 5000...'))