const modelUsers = require("../models/users");
const modelSauce = require("../models/sauces");

exports.sauce = (req, res) => {
    modelSauce.find()
    .then (sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}
exports.sauceId = (req, res) => {
    res.status(200).json({message : "Sauce seule"})
}

exports.sendSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject);
    const Sauce = new modelSauce({
        userId: sauceObject.userId,
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        heat: sauceObject.heat,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    Sauce.save();
    res.status(201).json({message : "Sauce créer"});
}
