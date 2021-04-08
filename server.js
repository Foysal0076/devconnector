const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
// const bodyParser = require('body-parser')

const app = express()

//Body Parser middleware
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//DB Config
const db = require('./config/keys').mongoURI

//COnnect to mongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error'))


app.get('/', (req, res) => res.send('<h1>Hello</h1>'))

//Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))