//// récupération du model sauce ////
const modelSauce = require("../models/sauces");

const fs = require("fs");

//// function pour récupérer toutes les sauces ////
exports.getAllSauces = (req, res) => {
    modelSauce.find()
    .then (sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}

//// function pour récupérer les informations de la sauce ////
exports.getSauce = (req, res) => {
    modelSauce.findOne({_id : req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({error}));
}

//// function pour créer la sauce ////
exports.postSauce = (req, res) => {
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

//// function pour supprimé la sauce ////
exports.deleteSauce = (req, res) => {
    modelSauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            modelSauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message : "Objet supprimé"}))
            .catch((error) => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(400).json({error}))
}

//// function pour modifié la sauce ////
exports.modifSauce = (req, res) => {
    const modifSauce = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : {...req.body};
    modelSauce.updateOne({_id: req.params.id}, {...modifSauce})
    .then(() => res.status(200).json({message : "Objet modifié"}))
    .catch((error) => res.status(400).json({error}));
}
//// function pour ajouté des likes ou en retiré ////
exports.modifLikes = (req, res) => {
    res.status(200).json({message: "like ajouté"});
}
