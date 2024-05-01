const mongoose = require('../database/index');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha:{
        type: String,
        required: true,
        select: false
    },
    criadoEm: {
        type: Date,
        default: Date.now
    },
    idade: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        enum: ['masculino', 'feminino', 'outro'],
        required: true
    },
});

UserSchema.pre("save", async function(next){
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
    next();
});

const User = mongoose.model('Usuario', UserSchema);

module.exports = User;
