const express = require('express');
const htmlRoute = require("./routes/htmlRoutes");
const apiRoute = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 1111;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use static files within the public folder
app.use(express.static('public'))

// the routes
app.use("/api", apiRoute);
app.use("/", htmlRoute);

//start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
