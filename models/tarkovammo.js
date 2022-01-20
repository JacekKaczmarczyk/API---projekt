const mongoose = require("mongoose");

const tarkovAmmoSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    caliber: {
        type: String,
        required: true
    },
    stackMaxSize: {
        type: Number,
        required: true
    },
    tracer: {
        type: Boolean,
        required: true
    },
    tracerColor: {
        type: String,
        required: true
    },
    ammoType: {
        type: String,
        required: true
    },
    projectileCount: {
        type: Number,
        required: true
    },
    ballistics: [
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

})

module.exports = mongoose.model("tarkovAmmo", tarkovAmmoSchema)