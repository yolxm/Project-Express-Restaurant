const express = require('express');
const router = express.Router();
const connection = require("../config/bd");
const uploadImage = require("../middleware/multer");
const dishController = require('../controllers/dishController');

// te lleva a vista formulario para crear plato
router.get("/", dishController.formCreateDish);

//registra el plato en BD
router.post("/create_dish", uploadImage('dishes'), dishController.saveNewDish);

//Eliminar plato
router.get("/deleteDish/:dish_id/:chef_id", dishController.deleteDish);

//vista que te lleva al formulario de editar plato
router.get("/:dish_id", dishController.formEditDish);

//editar plato
router.post("/save_new_dish/:dish_id/:chef_id", uploadImage('dishes'), dishController.saveEditedDish);

module.exports = router;