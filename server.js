const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入 user.js
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

const db = require('./config/keys').mongoURI

// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 连接 mongoose
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => {
		console.log('MongoDB Connected')
	})
	.catch((err) => {
		console.log(err)
	})

// passport 初始化
app.use(passport.initialize())

require('./config/passport')(passport)

// app.get('/', (req, res) => {
// 	res.send('hello world!')
// })

// 使用 routes
app.use('/api/users', users)
app.use('/api/profiles', profiles )


const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
