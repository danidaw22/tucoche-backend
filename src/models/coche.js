const mongoose = require("mongoose")
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    usuario: { type: SchemaMongo.Types.ObjectID, ref: 'usuario' },
    titulo: { type: String, requiere: true },
    descripcion: { type: String, requiere: true },
    marca: { type: String, requiere: true },
    modelo: { type: String, requiere: true },
    precio: { type: Number },
    km: { type: Number },
    localizacion: { type: String },
    combustible: { type: String },
    color: { type: String },
    puertas: { type: String },
    plazas: { type: Number },
    cambio: { type: String },
    anno: { type: Number },
    photo: { type: String },
    galeria: { type: [String] },
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

Schema.plugin(aggregatePaginate);

module.exports = mongoose.model("coche", Schema)