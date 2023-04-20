const express = require("express");
const cors = require("cors");
require ('dotenv').config()
const { PORT , BACKEND_URL } = process.env
const PORT = process.env.PORT || 5051

const app = express();

const { CORS_ORIGIN } = process.env;
app.use(cors({origin: CORS_ORIGIN}));

const homeRoutes = require ('./routes/home');
const uploadRoutes = require ('./routes/home');

app.use(express.json());


//using middleware
app.use((req, res, next) => {
    console.log(req.url);
    next();
  });
  
  app.use((req, res, next) => {
    console.log(req.method);
    next();
  });

  app.use(express.static("public"));


app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
      res.status(400).send("server requires application/json");
    } else {
      next();
    }
  });


  //creating some routes 

  app.use('/', homeRoutes);

  
  app.use('/upload', uploadRoutes);

  app.get ('/:id', (req,res) => {
  res.render('/', {id:req.params.id})

});


app.listen(8050, () => {
    console.log("server is running on 8050");
  });