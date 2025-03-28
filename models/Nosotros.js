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
const Empresa = mongoose.model('Empresa', companySchema)

// 4. EXPORTACIÓN
module.exports = Empresa
