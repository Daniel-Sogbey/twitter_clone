const express = require("express");
const router = express.Router();

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
	let payload = {
		pageTitle: "Register",
	};

	res.status(200).render("register", payload);
});

module.exports = router;
