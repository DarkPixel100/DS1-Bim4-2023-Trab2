const express = require("express");
const app = express();

const cors = require("cors");
const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);

const flash = require("req-flash");
const appRoutes = require("./routes/approutes");

const { sequelize } = require("./config/database");

app.use(cors());
// app.use(express.static("build"));

// session configuration
// session store
const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

// cookie
app.set("trust proxy", 1);
app.use(
  session({
    secret: "123",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 600000 },
  })
);

// flash configuration
app.use(flash());

// sequelize configuration
sequelize
  .sync()
  .then(() => {
    console.log("Database synced sucessfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use(appRoutes);

app.listen(8080, () => {
  console.log("app is running on port 8080");
});
