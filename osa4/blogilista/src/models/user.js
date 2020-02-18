const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)

const userSchema = mongoose.Schema({
	login: {
		type: String,
		minlength: 3,
		required: true,
		unique: true
	},
	hash: String,
	name: String
})

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.hash
		delete returnedObject._id
		delete returnedObject.__v
	}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)