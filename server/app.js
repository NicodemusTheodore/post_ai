if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/routes");

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
