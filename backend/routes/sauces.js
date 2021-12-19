const express = require("express");

const router = express.Router();

const multer = require("../middleware/multer");

const controllersSauces = require("../controllers/sauces");

router.get("/sauces" , controllersSauces.sauce);
router.get("/sauces/:id", controllersSauces.sauceId);
router.post("/sauces", multer, controllersSauces.sendSauce)

module.exports = router;