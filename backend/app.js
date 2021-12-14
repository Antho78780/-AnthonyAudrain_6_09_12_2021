//// imporation de express ////
const express = require("express");

const app = express();

app.use(express.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

/// importation de la base de données  mongoose ////
const mongoose = require('mongoose');

//// importation de la route user ///
const userLoginRoutes = require("./routes/usersLogin");
const usersRegisterRoutes = require("./routes/usersRegister");
const saucesRoutes = require("./routes/sauces");

//// liaison de la base de donneé mongoose ////
mongoose.connect('mongodb+srv://Antho78:admin@projet6-backend.5nn9s.mongodb.net/Project?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() =>console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use("/api/auth/signup", usersRegisterRoutes);
app.use("/api/auth/login", userLoginRoutes);
app.use("/api/sauces", saucesRoutes);

module.exports = app;