require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();
const port = 3000;

// connection();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// for api use
app.use("/api/customers", require("./routes/CustomerRoutes"));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use("/api/cart", require("./routes/CartRoutes"));
app.use("/api/admin", require("./routes/AdminRoutes"));

app.use("/visual", require("./routes"));

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
