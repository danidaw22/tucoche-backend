const favoritoController = {}
const Coche = require('../models/coche')
const Usuario = require('../models/usuario')
const Favorito = require('../models/favorito')

favoritoController.getFavs = async(req, res) => {
    const usuario = req.user._id
    try {
        const favoritos = await Favorito.find({ usuario: usuario }).populate("coche")
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
            const favoritonew = new Favorito({ usuario: usuario_id, coche: coche_id })
            await favoritonew.save()
            res.send({ status: "ok", accion: "agregar" })

        } catch (err) {
            console.log(err)
            res.status(500).send(err.message)
        }
    }

}

favoritoController.deleteFav = async(req, res) => {
    const idCoche = req.params.id
    const user = req.user._id
    try {
        const favorito = await Favorito.findOneAndDelete({ usuario: user, coche: idCoche })
        res.json(favorito)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}


module.exports = favoritoController