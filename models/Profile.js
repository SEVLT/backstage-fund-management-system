const mongoose = require('mongoose')
// mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

// 创建 Schema
const ProfileSchema = new Schema({
	type: {
		type: String,
	},
	describe: {
		type: String,
	},
	income: {
		type: String,
		require: true,
	},
	expend: {
		type: String,
		require: true,
	},
	cash: {
		type: String,
		require: true,
	},
	remark: {
		type: String,
	},
	date: {
		type: String,
		default: Date.now,
	},
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
