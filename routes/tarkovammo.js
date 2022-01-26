const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const tarkovAmmo = require('../models/tarkovammo');



router.post('/', (req,res) => {
    const ammo = new tarkovAmmo({
        _id: new mongoose.Types.ObjectId(),
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
    })
    ammo.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => res.status(500).json({Error: err}))
});

router.get("/", (req, res) => {
    tarkovAmmo.find()
    .then(result => {
        res.status(200).json({
            message: "Ammo list",
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
});

router.get("/:ammoID", (req, res, next) => {
    const id = req.params.ammoID
    tarkovAmmo.findById(id)
    .then(result => {
        res.status(200).json({
            message: "Ammo " + id,
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
})

router.get("/caliber/:caliber", (req, res, next) => {
    const caliber = req.params.caliber
    tarkovAmmo.find({caliber: caliber})
    .then(result => {
        res.status(200).json({
            message: "Ammo " + caliber,
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
})

router.put("/:ammoID", (req, res) => {
    tarkovAmmo.findByIdAndUpdate(req.params.ammoID, req.body).then(tarkovAmmo => {
        res.status(200).json({message: "Ammo updated " });
    }).catch(err => {console.log(err);});
})

router.delete('/:ammoID', (req, res, ) => {
    tarkovAmmo.findByIdAndRemove(req.params.ammoID).then(tarkovAmmo => {
        res.status(200).json({message: "Ammo deleted "});
    }).catch(err => {console.log(err);});
})

module.exports = router;