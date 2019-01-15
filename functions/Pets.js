const mongoose = require('mongoose');

const Pets = mongoose.model('Pet', {
    nombre: String, // Number, Boolean, {}, o [String] = arreglo de Strings
    tipo: String,
    descripcion: String,
})

module.exports = Pets
