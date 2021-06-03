const express = require("express")
const router = express.Router()
const usuarioController = require('../controllers/usuario.js')
const cocheController = require('../controllers/coche')
const favoritoController = require('../controllers/favorito')
const passport = require('../auth/auth')

//Rutas usuario
router.post("/registro", usuarioController.signup)
router.post("/login", usuarioController.login)

//Rutas coches
router.post("/coche", passport.auth, cocheController.addCoche)
router.get("/coches", passport.auth, cocheController.all)
router.put("/coche/:id", passport.auth, cocheController.update)
router.get("/coche/:id", cocheController.getCoche)
router.delete('/coche/:id', passport.auth, cocheController.delete)

router.get("/listaCoches", cocheController.all)

//Rutas favoritos
router.get("/favoritos", passport.auth, favoritoController.getFavs)
router.post("/favorito", passport.auth, favoritoController.addFav)
router.delete("/favorito/:id", passport.auth, favoritoController.deleteFav)

//Rutas panel
router.get("/perfil", passport.auth, usuarioController.perfil)
router.get("/panel", passport.auth, cocheController.panel)
router.put("/perfilUpdated", passport.auth, usuarioController.perfilUpdated)

module.exports = router