const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/UserRoute");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

//DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Connected to DB `);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoutes);

//listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
