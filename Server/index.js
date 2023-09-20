const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./database/dbConnection");
const authRoutes = require("./routes/auth");
const favoritosRoutes = require("./routes/favoritos");
const vistosRoutes = require("./routes/vistos");

// setting
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/auth", authRoutes);
app.use("/favoritos", favoritosRoutes);
app.use("/vistos", vistosRoutes);

// server
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);

  // db connect
  // force true: DROP TABLES
  connection
      .sync({ force: false })
    .then(() => {
      console.log("DB successful connected");
    })
    .catch((error) => {
      console.error("Has been an error", error);
    });
});
