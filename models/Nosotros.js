// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const companySchema = mongoose.Schema(
	{
		banner:{
			type: String,
		},
		texto:{
			type: String,
		},
		imagen:{
			type: String,
		},
		mision:{
			type: String,
		},
		vision:{
			type: String,
		},
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Nosotros = mongoose.model('Nosotros', companySchema)

// 4. EXPORTACIÓN
module.exports = Nosotros
