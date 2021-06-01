const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    nombre: { type: String, requiere: true },
    apellidos: { type: String, requiere: true },
    localidad: { type: String, requiere: true },
    telefono: { type: String, requiere: true },
    rol: { type: String, require: true, enum: ['user', 'admin'] },
    email: { type: String, require: true, unique: true },
    password: { type: String, requiere: true },
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


Schema.pre('save', async function(next) {
    try {
        const user = this
        const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        user.password = hash
        next()
    } catch (error) {
        next(error)
    }
})

Schema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare
}



module.exports = mongoose.model("usuario", Schema)