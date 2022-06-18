const express = require('express')
const router = require('./routes')
const {initializeDatabase} = require('./config/database')

const app = express()

require('./config/handlebars')(app)

app.use('/static', express.static('static'))
app.use(express.urlencoded({extended: false}))
app.use(router)

initializeDatabase()
    .then(() => {
        app.listen(5000, () => console.log('Server started on port 5000...'))
    })
    .catch((err) => {
        console.log('DB Connection problem:', err);
    })
