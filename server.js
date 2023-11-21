const express = require("express");

const app = express();
const port = 3000;

app.get("/hello", (_req, res) => {
  res.status(200).send("Welcome to our new website");
});

app.get("/test", (_req, res) => {
  res.status(200).send("Welcome to our test website");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
