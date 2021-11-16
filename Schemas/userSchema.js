const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		profilePic: {
			type: String,
			default: "/images/profilePic.png"
		}
	},
	{
		timestamps: true
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
