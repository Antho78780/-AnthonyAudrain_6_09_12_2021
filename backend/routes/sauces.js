/// importation du package express ///
const express = require("express");

//// importation du middelware d'authentification ///
const auth = require("../middleware/auth");

//// function router qui viens d'express ///
const router = express.Router();

//// importation du middleware multer ///
const multer = require("../middleware/multer");

//// importation du controllers sauces ///
const controllersSauces = require("../controllers/sauces");

//// utilisation de router pour créer les endPoints ///
router.get("/sauces", controllersSauces.getAllSauces);
router.get("/sauces/:id", controllersSauces.getSauce);
router.post("/sauces",auth, multer, controllersSauces.postSauce);
router.delete("/sauces/:id",auth, controllersSauces.deleteSauce);
router.put("/sauces/:id",auth, multer, controllersSauces.modifSauce);
router.post("/sauces/:id/like", controllersSauces.modifLikes)

/// exportation du module router ////
module.exports = router;