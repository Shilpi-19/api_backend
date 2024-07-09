const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to the database
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

// Sample route with JSON validation
// app.post(
//   "/api/v1/user/",
//   [
//     check("name").isString().withMessage("Name must be a string"),
//     check("email").isEmail().withMessage("Email must be valid"),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     // Your user handling code here
//     res.send("User route");
//   }
// );

// Connect routes
const userRouter = require("./routes/user");
app.use("/api/v1/user/", userRouter);

const productRouter = require("./routes/product");
app.use("/api/v1/product", productRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});