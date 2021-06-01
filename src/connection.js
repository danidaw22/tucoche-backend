const mongoose = require("mongoose")
const password = process.env.DBPASSWORD
const dbname = process.env.DBNAME
const user = process.env.DBUSER
const host = process.env.DBHOST
const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`
module.exports = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})