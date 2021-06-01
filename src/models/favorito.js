const mongoose = require("mongoose")
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    usuario:{type: SchemaMongo.Types.ObjectID, ref: 'usuario'},
    coche:{type: SchemaMongo.Types.ObjectID, ref: 'coche'},
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model("favorito", Schema)