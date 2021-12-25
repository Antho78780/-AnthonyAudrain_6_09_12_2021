const express = require("express");

const auth = require("../middleware/auth");

const router = express.Router();

const multer = require("../middleware/multer");

const controllersSauces = require("../controllers/sauces");

router.get("/sauces",auth, controllersSauces.getAllSauces);
router.get("/sauces/:id",auth, controllersSauces.getSauce);
router.post("/sauces",auth, multer, controllersSauces.postSauce);
router.delete("/sauces/:id",auth, controllersSauces.deleteSauce);
router.put("/sauces/:id",auth, multer, controllersSauces.modifSauce);
router.post("/sauces/:id/like", controllersSauces.modifLikes)

module.exports = router;