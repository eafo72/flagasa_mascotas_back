// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const carruselSchema = mongoose.Schema(
	{
		titulo: {
			type: String,
			required: [true,'El título es obligatorio']
		},
		subtitulo: {
			type: String,
			required: [true,'El subtítulo es obligatorio']
		},
		enlace: {
			type: String,
			required: [true,'El enlace es obligatorio']
		},
		imagen: {
			type: String,
			required: true
		}, 
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Carrusel = mongoose.model('Carrusel', carruselSchema)

// 4. EXPORTACIÓN
module.exports = Carrusel
