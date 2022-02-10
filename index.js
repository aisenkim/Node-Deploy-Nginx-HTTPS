const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  const date = new Date();
  res.send(`Hello ${req.body.name}, ${date}`);
});

app.post("/ttt/play", (req, res) => {
  res.send("Sent from the server /ttt/play");
});

app.listen(port, () => {
  console.log(`Example App For Deploying Nginx SSL on port: ${port}`);
});
