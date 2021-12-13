const express = require("express");

const router = express.Router();

const usersLogin = require("../models/usersLogin");

router.post("/", (req, res, next)=> {
    const UsersLogin = new usersLogin({
        ...req.body
    })
    UsersLogin.save();
    res.status(201).json({message : "Utilisateur connecté"});
    next();
})
router.get("/", (req, res, next) => {
    res.status(200).json();
})


module.exports = router;
