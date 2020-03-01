const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const roleSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: Number,
        required: true,
        unique: true,
    }
})


mongoose.model('Role', roleSchema)