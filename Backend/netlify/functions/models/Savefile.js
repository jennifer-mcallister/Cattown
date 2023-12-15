const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Bobben"
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1
    },
    health: {
        type: Number,
        default: 10,
    },
    strength: {
        type: Number,
        default: 1,
    },
    training: {
        onTraining: {
            type: Boolean
        },
        date: {
            type: String,
        },
        durration: {
            type: String,
        },
        type: {
            type: String
        }
    },
    mission: {
        onMission: {
            type: Boolean
        },
        date: {
            type: String
        },
        durration: {
            type: String
        },
        type: {
            type: String
        }
    },
})

const SavefileSchema = new mongoose.Schema({
    gold: {
        type: Number,
        default: 0,
    },
    stats: {
        luck: {
            type: Number,
            default: 1,
        },
        health: {
            type: Number,
            default: 1,
        },
        strength: {
            type: Number,
            default: 1,
        },
        fireDamage: {
            type: Number,
            default: 1,
        },
        waterDamage: {
            type: Number,
            default: 1,
        },
        shadowDamage: {
            type: Number,
            default: 1,
        },
        natureDamage: {
            type: Number,
            default: 1,
        }
    },
    uniqueItems: [Number],
    relics: [Number],
    cats: [CatSchema]
   
})

module.exports = mongoose.model("Savefile", SavefileSchema, "savefiles");
