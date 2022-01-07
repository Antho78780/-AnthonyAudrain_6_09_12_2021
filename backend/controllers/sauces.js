//// récupération du schéma model sauce ////
const modelSauce = require("../models/sauces");

const fs = require("fs");
const { Z_UNKNOWN } = require("zlib");

//// function pour récupérer toutes les sauces ////
exports.getAllSauces = (req, res) => {
    modelSauce.find()
    .then ((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
}

//// function pour récupérer les informations de la sauce ////
exports.getSauce = (req, res) => {
    modelSauce.findOne({_id : req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce);
    })
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
        Sauce.save()
        .then(() => res.status(201).json({message : "Sauce créer"}))
        .catch((error) => res.status(400).json({error}));
        console.log("Sauce créer");
        console.log(req.body);
}

//// function pour supprimé la sauce ////
exports.deleteSauce = (req, res) => {
    modelSauce.findOne({_id: req.params.id})
    .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            modelSauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message : "Objet supprimé"}))
            .catch((error) => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(400).json({error}));
    console.log("Sauce supprimé")
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
    modelSauce.findOne({_id : req.params.id})
    .then((sauce) => {
        res.status(200).json();

        if(req.body.like == 1 && sauce.userId == req.body.userId || req.body.like == 1 && sauce.userId != req.body.userId) {
            const resultLike = req.body.like + sauce.likes;

            sauce.updateOne({$push : {usersLiked : req.body.userId}})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

            sauce.updateOne({likes : resultLike})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

            console.log("<--- USERID ET LIKE ---->");
            console.log(req.body);
            console.log("like 1");
        }
        else if (req.body.like == -1 && sauce.userId == req.body.userId || req.body.like == -1 && sauce.userId != req.body.userId) {
            req.body.like = 0;
            req.body.dislike = 1;
            const resultDisLike = req.body.dislike + sauce.dislikes;

           sauce.updateOne({$push : {usersDisliked : req.body.userId}})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

           sauce.updateOne({dislikes : resultDisLike})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

            console.log("<--- USERID ET DISLIKE ---->");
            console.log(req.body);
            console.log("disLike 1");
        }
        else if(req.body.like == 0 && sauce.likes) {
            console.log("USERID supprimé du tableau usersLiked");
            sauce.updateOne({$pull : {usersLiked : req.body.userId}})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

           sauce.updateOne({likes : --sauce.likes})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

            console.log(req.body); 
        }
        else if(req.body.like == 0 && sauce.dislikes) {
            console.log("USERID supprimé du tableau usersDisliked");

            sauce.updateOne({$pull : {usersDisliked : req.body.userId}})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

           sauce.updateOne({dislikes : --sauce.dislikes})
            .then(() => res.status(200).json())
            .catch((err) => res.status(400).json({err}));

            console.log(req.body); 
        }
    })
       
}

