const mongoose = require("mongoose");

class Database {
	constructor() {
		this.connect();
	}

	connect() {
		mongoose
			.connect("mongodb://localhost:27017/cloneTwitterDB", {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(() => {
				console.log("database connected successfully");
			})
			.catch(err => {
				console.log(err, "error when connecting to database");
			});
	}
}

module.exports = new Database();
