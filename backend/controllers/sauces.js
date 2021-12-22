const modelUsers = require("../models/users");
const modelSauce = require("../models/sauces");

exports.sauce = (req, res) => {
    modelSauce.find()
    .then (sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}
exports.sauceId = (req, res) => {
    modelSauce.findOne({_id : req.params.id})
    .then((idSauce) => res.status(200).json(idSauce))
    .catch((error) => res.status(404).json({error}));
    console.log(req.params);
}
exports.sendSauce = (req, res) => {
        const sauceObject = JSON.parse(req.body.sauce);
        const Sauce = new modelSauce({
            userId: sauceObject.userId,
            ...sauceObject,
            imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        })
        Sauce.save();
        console.log(Sauce)
        res.status(201).json({message : "Sauce créer"});
}
