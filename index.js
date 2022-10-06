const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8000"
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
  });


// simple route
app.get("/v2/products", (req, res) => {
    res.json({ message: "Congrats, it works"});
  });

//Routes
require("./app/routes/auth.route")(app)
require("./app/routes/product.route")(app)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});