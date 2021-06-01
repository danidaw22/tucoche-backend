const Joi = require('joi')

const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    apellidos: Joi.string().min(2).required(),
    localidad: Joi.string().min(2).required(),
    telefono: Joi.string().min(9).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(9).required(),
    rol: Joi.string().valid("user", "admin").required(),
})

function validate(body) {

    return schema.validate({
        nombre: body.nombre,
        apellidos: body.apellidos,
        localidad: body.localidad,
        telefono: body.telefono,
        email: body.email,
        password: body.password,
        rol: body.rol
    }, { abortEarly: false })

    //abortEarly:false  Nos muestra todos los errores

}


module.exports = {

    validate,

}