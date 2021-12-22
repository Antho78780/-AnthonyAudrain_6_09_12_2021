//// imporation du package express ////
const express = require("express");

//// création de app qui va utilisé la function express /// 
const app = express();

const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

//// utilisation de app qui va convertir le corp de mes requetes en json ////
app.use(express.json());

/// importation du package mongoose ////
const mongoose = require('mongoose');

//// importation de routes ///
const usersRoutes = require("./routes/users");
const sauces = require("./routes/sauces");

//// liaison à la base de donneé mongoose ////
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@projet6-backend.5nn9s.mongodb.net/Project?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() =>console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
///// utilisation de cors(Cross-origin resource sharing) ////
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})
//// utilisation des endPoints et API ////

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", usersRoutes);
app.use("/api", sauces)

//// exportation du module app ///
module.exports = app;