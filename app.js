const express = require("express");
const middleware = require("./middleware");
const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use("/login", loginRoutes);

app.get("/", middleware.requireLogin, (req, res, next) => {
	let payload = {
		pageTitle: "Home",
	};

	res.status(200).render("home", payload);
});

const PORT = 8081;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
