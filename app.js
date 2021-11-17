require("./database");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const middleware = require("./middleware");
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({
		secret: "clone twitter",
		resave: true,
		saveUninitialized: false
	})
);

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.get("/", middleware.requireLogin, (req, res, next) => {
	let payload = {
		pageTitle: "Home",
		userLoggedIn: req.session.user
	};

	res.status(200).render("home", payload);
});

const PORT = 8081;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
