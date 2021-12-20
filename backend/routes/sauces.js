const express = require("express");

const auth = require("../middleware/auth");

const router = express.Router();

const multer = require("../middleware/multer");

const controllersSauces = require("../controllers/sauces");

router.get("/sauces" , controllersSauces.sauce);
router.get("/sauces/:id", controllersSauces.sauceId);
router.post("/sauces",auth,multer, controllersSauces.sendSauce);

module.exports = router;