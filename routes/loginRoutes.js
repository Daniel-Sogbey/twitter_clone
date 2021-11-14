const express = require("express");

const router = express.Router();
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
	let payload = {
		pageTitle: "Login",
	};

	res.status(200).render("login", payload);
});

module.exports = router;
