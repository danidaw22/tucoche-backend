const Joi = require('joi')

const schema = Joi.object({
    usuario: Joi.required(),
    titulo: Joi.string().min(2).required(),
    descripcion: Joi.string().min(10).required(),
    marca: Joi.string().min(2).required(),
    modelo: Joi.string().min(2).required(),
    precio: Joi.number(),
    km: Joi.number(),
    localizacion: Joi.string().min(2),
    combustible: Joi.string().min(2),
    color: Joi.string().min(2),
    puertas: Joi.number(),
    plazas: Joi.number(),
    cambio: Joi.string().min(2),
    anno: Joi.number(),
})

function validate(body) {

    return schema.validate({
        usuario: body.usuario,
        titulo: body.titulo,
        descripcion: body.descripcion,
        marca: body.marca,
        modelo: body.modelo,
        precio: body.precio,
        km: body.km,
        localizacion: body.localizacion,
        combustible: body.combustible,
        color: body.color,
        puertas: body.puertas,
        plazas: body.plazas,
        cambio: body.cambio,
        anno: body.anno,
    }, { abortEarly: false })

    //abortEarly:false  Nos muestra todos los errores

}


module.exports = {

    validate,

}