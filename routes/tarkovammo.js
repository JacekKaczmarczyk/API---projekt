const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const tarkovAmmo = require('../models/tarkovammo');

router.get('/', (req,res) => {
    res.send('Homepage');
});

router.post('/', (req,res) => {
    const ammo = new tarkovAmmo({
        name: req.body.name,
        shortName: req.body.shortName,
        weight: req.body.weight,
        caliber: req.body.caliber,
        stackMaxSize: req.body.stackMaxSize,
        tracer: req.body.tracer,
        tracerColor: req.body.tracerColor,
        ammoType: req.body.ammoType,
        projectileCount: req.body.projectileCount,
        ballistics: req.body.ballistics
        /*[
            {
                dmg: Number,
                armordamage: Number,
                fragmentationChance: Number,
                penetrationChance: Number,
                accuaracy: Number,
                recoil: Number,
                initialSpeed: Number
            }
        ]
        */
    })
    ammo.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.json({message: err})
    })
})

module.exports = router;