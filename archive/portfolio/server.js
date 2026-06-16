const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Choose a port number

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost", // Your MySQL host (e.g., localhost or cloud host)
  user: "root",      // Your MySQL username
  password: "root",      // Your MySQL password
  database: "contact_form", // Database name
});

// Check MySQL connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// API endpoint to handle form submissions
app.post("/submit", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate the data (basic)
  if (!name || !email || !message) {
    return res.status(400).send("Please fill in all required fields.");
  }

  // Insert the data into the MySQL database
  const query = "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("An error occurred while submitting the form.");
    }

    console.log("Message saved:", result);
    res.status(200).send("Message submitted successfully!");
  });
});

// Serve static files (e.g., HTML, CSS, JS files)
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
