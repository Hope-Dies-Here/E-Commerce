require("dotenv").config();
const express = require("express");
const { connection, sequelize } = require("./config/db");
const Customer = require("./models/Customer");

const app = express();
const port = 3000;

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/customers", require("./routes/CustomerRoutes"));
app.use("/products", require("./routes/ProductRoutes"));
app.use("/cart", require("./routes/CartRoutes"));
app.use("/admin", require("./routes/AdminRoutes"));
app.use("/test", require("./routes/TestRoute"));

app.get("/", async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch((error) => console.error("Error syncing database:", error));

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
