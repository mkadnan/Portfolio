const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const dbName = "contact_form";
const messagesFile = path.join(__dirname, "messages.json");
let db;
let dbConnected = false;

// Middleware to parse JSON and URL-encoded data
app.use(cors({
  origin: [
    "https://portfolio-iota-ten-hajmf5mc1e.vercel.app"
  ]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
};

function saveMessageLocally(message, callback) {
  fs.readFile(messagesFile, "utf8", (readErr, data) => {
    let messages = [];
    if (!readErr) {
      try {
        messages = JSON.parse(data) || [];
      } catch (parseErr) {
        messages = [];
      }
    }

    messages.push(message);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), "utf8", callback);
  });
}

function initDatabase() {
  db = mysql.createConnection(dbConfig);
  db.connect((err) => {
    if (err) {
      console.error("Unable to connect to MySQL:", err);
      console.warn("Falling back to local message storage in messages.json.");
      dbConnected = false;
      return;
    }

    db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (createErr) => {
      if (createErr) {
        console.error("Error creating database:", createErr);
        return;
      }

      db.changeUser({ database: dbName }, (changeErr) => {
        if (changeErr) {
          console.error("Error selecting database:", changeErr);
          return;
        }

        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(255),
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;

        db.query(createTableQuery, (tableErr) => {
          if (tableErr) {
            console.error("Error ensuring messages table exists:", tableErr);
            return;
          }

          dbConnected = true;
          console.log("Connected to MySQL and verified messages table.");
        });
      });
    });
  });
}

initDatabase();

// API endpoint to handle form submissions
app.post("/submit", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate the data (basic)
  if (!name || !email || !message) {
    return res.status(400).send("Please fill in all required fields.");
  }

  const formData = {
    name,
    email,
    subject,
    message,
    created_at: new Date().toISOString(),
  };

  if (dbConnected && db) {
    const query = "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, subject, message], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("An error occurred while submitting the form.");
      }

      console.log("Message saved:", result);
      res.status(200).send("Message submitted successfully!");
    });
    return;
  }

  saveMessageLocally(formData, (err) => {
    if (err) {
      console.error("Error saving message locally:", err);
      return res.status(500).send("An error occurred while submitting the form.");
    }

    console.log("Message saved locally to messages.json.");
    res.status(200).send("Message submitted successfully!");
  });
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Serve frontend index.html for all unmatched routes (fallback)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
