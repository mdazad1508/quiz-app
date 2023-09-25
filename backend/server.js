const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(
  `mongodb+srv://mdazad15081999:${process.env.PASSWORD}@cluster0.ehe6ci3.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Email = mongoose.model("Email", {
  address: String,
});

// Middleware
app.use(bodyParser.json());

// API Endpoint to store emails
app.post("/api/emails", async (req, res) => {
  try {
    const email = new Email({ address: req.body.address });
    await email.save();
    res.status(201).json({ message: "Email saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
