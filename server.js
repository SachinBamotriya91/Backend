const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.json());
require("./routes/user.routes")(app);
require("./routes/products.routes")(app);
require("./routes/cart.routes")(app);


app.listen(8080, () => {
    console.log("listening at 8080")
})