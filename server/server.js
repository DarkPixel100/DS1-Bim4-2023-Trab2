const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

const appRoutes = require("./routes/approutes");

const { sequelize } = require("./config/database");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("build"));

// sequelize configuration
sequelize
  .sync()
  .then(() => {
    console.log("Database synced sucessfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use("/api", appRoutes);

app.listen(8000, () => {
  console.log("app is running on port 8000");
});
