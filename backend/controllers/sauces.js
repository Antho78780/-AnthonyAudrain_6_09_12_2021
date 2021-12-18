
exports.sauce = (req, res) => {
    res.status(200).json({message : "toute les sauces"})
}
exports.sauceId = (req, res) => {
    res.status(200).json({message : "Sauce seule"})
}
