const express = require("express");
const cors = require("cors");
require ('dotenv').config()
const {PORT , BACKEND_URL} = process.env


const app = express();

app.use(cors());

app.use(express.json());

const videoRoutes = require ('./routes/videos');
app.use('/', videoRoutes);


//using middleware
// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
//   });
  
//   app.use((req, res, next) => {
//     console.log(req.method);
//     next();
//   });

  app.use(express.static("public"));
  

// app.use((req, res, next) => {
//     if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
//       res.status(400).send("server requires application/json");
//     } else {
//       next();
//     }
//   });


 


  app.get ('/:id', (req,res) => {
  res.render('/', {id:req.params.id})

});


app.listen(8050, () => {
    console.log("server is running on 8050");
  });