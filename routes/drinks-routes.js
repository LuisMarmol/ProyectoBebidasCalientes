const express = require('express');

const drinksControllers = require('../controllers/drinks-controllers');

const router = express.Router();

router.get('/', drinksControllers.getAllDrinks);
router.get('/:did', drinksControllers.getDrinkById);
router.get('/creator/:cid', drinksControllers.getDrinkByCreator);

router.post('/', drinksControllers.saveDrink);

router.patch('/:did', drinksControllers.updateDrink);

router.delete('/:did', drinksControllers.deleteDrink);

module.exports = router;