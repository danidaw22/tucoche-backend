const cocheController = {}
const Coche = require('../models/coche')
const Favorito = require('../models/favorito')
const cocheValidator = require('../validators/coche')


cocheController.addCoche = async(req, res) => {
    const dataCoche = {
        usuario: req.user._id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio,
        km: req.body.km,
        localizacion: req.body.localizacion,
        combustible: req.body.combustible,
        color: req.body.color,
        puertas: req.body.puertas,
        plazas: req.body.plazas,
        cambio: req.body.cambio,
        anno: req.body.anno,
        photo: req.body.photo,
        galeria: req.body.galeria
    }

    const validation = cocheValidator.validate(dataCoche)

    if (validation.error) {

        const errors = validation.error.details.map(error => error.message)

        res.status(400).send(errors)

        return
    }

    try {
        const coche = new Coche(dataCoche)
        await coche.save()
        const data = await Coche.findOne({ titulo: req.body.titulo })
        res.send({ status: "ok", data: data })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

cocheController.all = async(req, res) => {
    /*const coches = await Coche.find()
    res.json(coches)*/
    const filter = req.query.filter
    const marca = req.query.marca
    const modelo = req.query.modelo
    const precioInicial = req.query.precioInicial
    const precioFinal = req.query.precioFinal
    const annoInicial = req.query.annoInicial
    const annoFinal = req.query.annoFinal
    const location = req.query.location
    const combustible = req.query.combustible
    const color = req.query.color
    const kmInicial = req.query.kmInicial
    const kmFinal = req.query.kmFinal
    const npuertas = req.query.npuertas
    const cambio = req.query.cambio

    try {

        if (!filter && !marca && !modelo && (!precioInicial || !precioFinal) && (!annoInicial || !annoFinal) && !location && !combustible && !color && (!kmInicial || !kmFinal) && !npuertas && !cambio) {

            const options = {
                page: 1,
                limit: 1000
            };

            var myAggregate = Coche.aggregate();

            var coches = await Coche.aggregatePaginate(myAggregate, options)

            // console.log(coches)
            if (req.user) {
                var favoritos = await Favorito.find({ usuario: req.user._id })
                let fav = []
                for (const favorito of favoritos) {
                    fav.push(String(favorito.coche))
                }
                if (fav.length > 0) {
                    for (const coche of coches.docs) {
                        if (fav.includes(String(coche._id))) {
                            //do something
                            coche.favorito = true
                        } else {
                            coche.favorito = false
                        }
                    }
                }
            }


            /*const coches = await Coche.find()*/

            res.json(coches)
        } else {

            const and = []

            if (filter) {
                and.push({
                    $or: [{
                        fullname: new RegExp(filter, 'i')
                    }]
                })
            }

            if (marca) {
                and.push({
                    marca: new RegExp(marca, 'i')
                })
            }

            if (modelo) {
                and.push({
                    modelo: new RegExp(modelo, 'i')
                })
            }

            if (precioInicial && precioFinal) {
                and.push({
                    precio: {
                        $gte: Number(precioInicial),
                        $lte: Number(precioFinal)
                    }
                })
            }

            if (annoInicial && annoFinal) {
                and.push({
                    anno: {
                        $gte: Number(annoInicial),
                        $lte: Number(annoFinal)
                    }
                })
            }

            if (location) {
                and.push({
                    localizacion: new RegExp(location, 'i')
                })
            }

            if (combustible) {
                and.push({
                    combustible: new RegExp(combustible, 'i')
                })
            }

            if (color) {
                and.push({
                    color: new RegExp(color, 'i')
                })
            }

            if (kmInicial && kmFinal) {
                and.push({
                    km: {
                        $gte: Number(kmInicial),
                        $lte: Number(kmFinal)
                    }
                })
            }

            if (npuertas) {
                and.push({
                    puertas: npuertas
                })
            }

            if (cambio) {
                and.push({
                    cambio: new RegExp(cambio, 'i')
                })
            }

            /*const coches = await Coche.aggregate(
                [
                    { $addFields: { fullname: { $concat: ["$titulo", " ", "$descripcion"] } } },
                    {
                        $match: { $and: and }
                    }
                ]
            )*/

            const options = {
                page: 1,
                limit: 1000
            };

            var myAggregate = Coche.aggregate(
                [
                    { $addFields: { fullname: { $concat: ["$titulo", " ", "$descripcion"] } } },
                    {
                        $match: { $and: and }
                    }
                ]
            );

            var coches = await Coche.aggregatePaginate(myAggregate, options)

            if (req.user) {
                var favoritos = await Favorito.find({ usuario: req.user._id })
                let fav = []
                for (const favorito of favoritos) {
                    fav.push(String(favorito.coche))
                }
                if (fav.length > 0) {
                    for (const coche of coches.docs) {
                        if (fav.includes(String(coche._id))) {
                            //do something
                            coche.favorito = true
                        } else {
                            coche.favorito = false
                        }
                    }
                }
            }

            res.json(coches)
        }



    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

cocheController.update = async(req, res) => {
    const dataCoche = {
        usuario: req.user._id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio,
        km: req.body.km,
        localizacion: req.body.localizacion,
        combustible: req.body.combustible,
        color: req.body.color,
        puertas: req.body.puertas,
        plazas: req.body.plazas,
        cambio: req.body.cambio,
        anno: req.body.anno,
        photo: req.body.photo,
        galeria: req.body.galeria,
        updatedAt: Date.now()
    }

    const validation = cocheValidator.validate(dataCoche)

    if (validation.error) {

        const errors = validation.error.details.map(error => error.message)
        console.log(errors)
        res.status(400).send(errors)

        return
    }

    try {
        await Coche.findByIdAndUpdate(req.params.id, dataCoche)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

cocheController.getCoche = async(req, res) => {
    const id = req.params.id
    try {
        const coche = await Coche.findById(id).populate('usuario')
        res.json(coche)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

cocheController.delete = async(req, res) => {
    const id = req.params.id
    try {
        const coche = await Coche.findByIdAndDelete(id)
        res.json(coche)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

cocheController.panel = async(req, res) => {

    try {
        const coches = await Coche.find({ usuario: req.user._id })

        res.json(coches)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }


}



module.exports = cocheController