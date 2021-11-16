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
		pageTitle: "Login"
	};

	res.status(200).render("login", payload);
});

router.post("/", async (req, res, next) => {
	let payload = req.body;

	if (req.body.username && req.body.password) {
		const user = await User.findOne({
			$or: [{ username: req.body.username }, { email: req.body.username }]
		});

		if (!user) {
			payload.errorMessage = "No user with the username or password found";
			res.status(200).render("login", payload);
		} else {
			let isMatch = await bcrypt.compare(req.body.password, user.password);

			if (isMatch) {
				req.session.user = user;
				return res.redirect("/");
			} else {
				payload.errorMessage = "No user with the username or password found";
				res.status(200).render("login", payload);
			}
		}
	} else {
		payload.errorMessage = "Make sure each field has a valid value";
		res.status(200).render("login", payload);
	}
});

module.exports = router;
