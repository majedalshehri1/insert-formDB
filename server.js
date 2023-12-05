// Majed Alshehri 2142466
const express = require("express");
const app = express();
const port = 4000;

const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "lab9DB",
  port: 8889,
});

app.use("/", express.static("./website"));

// Insert data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (req, res) => {
  const data = { 
    name: req.body.name, 
    email: req.body.email 
  };
  const query = "INSERT INTO user SET ?";

  pool.query(query, data, (error, result) => {
    if (error) throw error;

    res.send("Data inserted successfully!");
  });
});

// View data
app.get("/view", (req, res) => {
  const query = "SELECT * FROM user";

  pool.query(query, (error, result) => {
    if (error) throw error;

    res.json(result);
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
