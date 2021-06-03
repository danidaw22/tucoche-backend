const mailerController = {}
const mailer = require("../helpers/mailer")
    //pub
const Email = require('email-templates')
const path = require('path') //para acceder a carpetas de nuestro proyecto
const appDir = path.join(__dirname, '../templates/')
const emailObj = new Email({
    views: {
        root: appDir
    }
})



mailerController.contacto = async(req, res) => {
    try {
        const name = req.body.nombre
        const email = req.body.email
        const telefono = req.body.telefono
        const comentario = req.body.comentario
        const titulo = req.body.titulo
        const subject = `losCar contacto`
            // Descomentar en producción
            //const destination = req.body.emailCoche
        const destination = "danidaw2019@gmail.com"

        const locals = { name: name, email: email, telefono: telefono, comentario: comentario, titulo: titulo }
        const html = await emailObj.render('contacto.pug', locals)
            //console.log(html)
        await mailer.send(subject, destination, html)
        res.status(204).send()
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error al enviar el email" })
    }
}


module.exports = mailerController