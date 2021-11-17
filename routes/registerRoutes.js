const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../Schemas/userSchema");

const router = express.Router();
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
	let payload = {
		pageTitle: "Register"
	};

	console.log(req.body);

	res.status(200).render("register", payload);
});

router.post("/", async (req, res, next) => {
	let payload = req.body;

	let firstName = req.body.firstName.trim();
	let lastName = req.body.lastName.trim();
	let username = req.body.username.trim();
	let email = req.body.email.trim();
	let password = req.body.password;

	if (firstName && lastName && username && email && password) {
		console.log(req.body);
		const user = await User.findOne({
			$or: [{ username: username }, { email: email }]
		}).catch(err => {
			console.log(err, "with finding user");
			payload.errorMessage = "Something went wrong";
			res.status(200).render("register", payload);
		});

		if (user == null) {
			let data = req.body;
			data.password = await bcrypt.hash(password, 10);

			User.create(data)
				.then(user => {
					req.session.user = user;
					console.log(user);
					return res.redirect("/");
				})
				.catch(err => {
					console.log(err, "with trying to create user");
				});
		} else {
			if (user.username === username) {
				payload.errorMessage = "User with username already available";
			} else {
				payload.errorMessage = "User with email already available";
			}
			res.status(200).render("register", payload);
		}
	} else {
		payload.errorMessage = "Make sure each field has a valid value";
		console.log(req.body);
		res.status(200).render("register", payload);
	}
});

module.exports = router;
