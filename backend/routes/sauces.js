const express = require("express");

const router = express.Router();

const controllersSauces = require("../controllers/sauces");

router.get("/sauces" , controllersSauces.sauce);
router.get("/sauces/:id", controllersSauces.sauceId);
router.post("/sauces", controllersSauces.sendSauce)

module.exports = router;