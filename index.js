const express = require("express");
const cors = require("cors");


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.url);
    next();
  });
  
  app.use((req, res, next) => {
    console.log(req.method);
    next();
  });

  app.use(express.static("./public/images"));


app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
      res.status(400).send("server requires application/json");
    } else {
      next();
    }
  });

app.listen(8050, () => {
    console.log("server is running on 8050");
  });