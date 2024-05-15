const {v4: uuid} = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_DRINKS = [
    {
        id: 'hd1',
        name: 'Pumpking_Spice_Latte',
        creator: 'bt1'
    },
    {
        id:'hd2',
        name:'Tea',
        creator: 'bt2'
    },
    {
        id:'hd3',
        name: 'Golden_Milk',
        creator: 'bt3'
    }
];

const getAllDrinks = (req, res, next)=>{
    res.json({drinks : DUMMY_DRINKS});
};

const getDrinkById = (req, res, next)=>{
    const drink = DUMMY_DRINKS.find(d=>{
        return d.id === req.params.did;
    });
    if(!drink){
        const error = new Error('Bebida no existente para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({drink});
    }
};

const getDrinkByCreator = (req, res, next)=>{
    const drink = DUMMY_DRINKS.find(d=>{
        return d.creator === req.params.cid
    });
    if(!drink){
        const error = new HttpError('Bebida no existente para el id de creador especificado');
        throw error;
    }
    res.json({drink});
};

const saveDrink = (req, res, next)=>{
    const {name, creator} = req.body;
    const id = uuid();
    const createdDrink = {
        id,
        name,
        creator
    };
    DUMMY_DRINKS.push(createdDrink);
    res.status(201).json({drink: createdDrink});

    res.json({drink});
};

const updateDrink = (req, res, next)=>{
    const {name} = req.body;
    const drinkId = req.params.did;

    const updatedDrink = {... DUMMY_DRINKS.find(d=> d.id === drinkId)};
    const drinksIndex = DUMMY_DRINKS.findIndex(d=> d.id === drinkId);

    updatedDrink.name = name;

    DUMMY_DRINKS[drinksIndex] = updatedDrink;
};

const deleteDrink = (req, res, next)=>{
    const drinkId = req.params.did;
    DUMMY_DRINKS = DUMMY_DRINKS.filter(d=> d.id !== drinkId)
    res.status(200).json({message: 'Bebida eliminada exitosamente'});
};

exports.getAllDrinks = getAllDrinks;
exports.getDrinkById = getDrinkById;
exports.getDrinkByCreator = getDrinkByCreator;
exports.saveDrink = saveDrink;
exports.updateDrink = updateDrink;
exports.deleteDrink = deleteDrink;