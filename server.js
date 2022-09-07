require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

const userRoutes = require("./routes/users");
const moviesRoutes = require('./routes/movies')
const recipeRoutes = require('./routes/recipes')
const calendarRoutes = require('./routes/calendar')

app.use("/user", userRoutes);
app.use("/movies", moviesRoutes)
app.use("/recipes", recipeRoutes)
app.use("/calendar", calendarRoutes)


app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });