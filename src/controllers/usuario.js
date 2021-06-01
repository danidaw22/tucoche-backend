const usuarioController = {}

const Usuario = require('../models/usuario')
const usuarioValidator = require('../validators/usuario')
const authJWT = require("../auth/jwt")

usuarioController.signup = async(req, res) => {
    const dataUser = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        localidad: req.body.localidad,
        telefono: req.body.telefono,
        rol: req.body.rol,
        email: req.body.email,
        password: req.body.password
    }

    const validation = usuarioValidator.validate(req.body)

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message)

        res.status(400).send(errors)

        return
    }

    try {
        const user = new Usuario(dataUser)
        await user.save()
        const data = await Usuario.findOne({ email: req.body.email })
        res.send({ status: "ok", data: data })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

usuarioController.login = async(req, res) => {

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(401).send("Credenciales incorrectas")
        return
    }

    try {
        const usuario = await Usuario.findOne({ email: email })

        if (!usuario) {
            res.status(401).send("Usuario no existe")
            return
        }
        const validate = await usuario.isValidPassword(password)
        if (!validate) {
            res.status(401).send("Contraseña incorrecta")
            return
        }

        const dataToken = authJWT.createToken(usuario)

        return res.send({
            usuario_id: usuario._id,
            access_token: dataToken[0],
            expires_in: dataToken[1],
            email: email
        })
    } catch (err) {
        console.log(err)
        res.status(401).send("Credenciales incorrectas")
        return
    }

}

usuarioController.perfil = async(req, res) => {

    try {
        const perfil = await Usuario.findById(req.user._id)
        res.json(perfil)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }

}

usuarioController.perfilUpdated = async(req, res) => {
    const usuario = {
        usuario: req.body.usuario,
        apellidos: req.body.apellidos,
        email: req.body.email,
        telefono: req.body.telefono,
        localidad: req.body.localidad,
        password: req.body.password,
        updatedAt: Date.now()
    }

    const validation = usuarioValidator.validate(req.body)

    if (validation.error) {

        const errors = validation.error.details.map(error => error.message)

        res.status(400).send(errors)

        return
    }

    try {
        await Usuario.findByIdAndUpdate(req.user._id, usuario)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = usuarioController