const favoritoController = {}
const Coche = require('../models/coche')
const Usuario = require('../models/usuario')
const Favorito = require('../models/favorito')

favoritoController.getFavs = async(req, res) => {
    const usuario = req.user._id

    try {
        const favoritos = await Favorito.find({ usuario: usuario })
        res.json(favoritos)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }

}

favoritoController.addFav = async(req, res) => {
    const usuario_id = req.user._id
    const coche_id = req.body.coche_id
    let coche = ""
    let usuario = ""

    try {
        coche = await Coche.findById(coche_id)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }

    try {
        usuario = await Usuario.findById(usuario_id)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }

    if (coche && usuario) {
        try {
            const favorito = new Favorito({ usuario: usuario_id, coche: coche_id })
            await favorito.save()
            res.send({ status: "ok" })
        } catch (err) {
            console.log(err)
            res.status(500).send(err.message)
        }
    }

}


module.exports = favoritoController