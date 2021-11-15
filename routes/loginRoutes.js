const express = require("express");
const bodyParser = require("body-parser");

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

module.exports = router;
