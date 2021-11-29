const express = require('express');
const router = express.Router();
const connection = require("../config/bd");
const uploadImage = require("../middleware/multer");
const sha1 = require("sha1");
const chefController = require('../controllers/chefController');

//Todos los chefs
router.get("/", chefController.homePage);

// Un chef solo en otra vista
router.get("/chef/:chef_id", chefController.oneChef);

//te lleva a la vista de login: donde estará INICIO SESIÓN Y REGISTRARTE
router.get("/login", chefController.formLogin);

//iniciar sesión chef
router.post("/login", chefController.logIn);

//te lleva a la vista de crear chef
router.get("/login/crear_chef", chefController.formRegister);

//te registra el chef
router.post("/login/register", uploadImage('chefs'), chefController.saveChef);

// //te lleva a la vista de editar chef
router.get("/editFormChef/:chef_id", chefController.viewEditFormChef);

// // //guarda los datos del chef editado
router.post("/editChef/:chef_id", uploadImage('chefs'), chefController.editChef);


module.exports = router;