const helper = {}
const nodemailer = require('nodemailer')
const user = "danny94landete@gmail.com"
const pass = process.env.SMTPPASSWORD
const transport = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
        user: user,
        pass: pass
    },
    tls: {

        rejectUnauthorized: false

    }
})

helper.send = (subject, to, html) => {
    return new Promise((resolve, reject) => {
        try {
            const from = "danny94landete@gmail.com"
            transport.sendMail({ from, subject, to, html }, (error, info) => {
                if (error) {
                    console.log('errorSendingEmail: ' + JSON.stringify(error))
                    reject(error)
                    return
                }

                console.log('emailSent: ' + JSON.stringify(info))
                resolve(info)
            })
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

module.exports = helper