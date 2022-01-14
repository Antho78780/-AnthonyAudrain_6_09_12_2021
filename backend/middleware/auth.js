//// implantation du package JSON TOKEN ////
const jsonToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        console.log("<----token d'identification---->");
        console.log(token);

        const decodedToken = jsonToken.verify(token, `${process.env.DB_TOKEN}`);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw "UserId non valable";
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({error : error | "requéte non authentifié !"});
    } 
}