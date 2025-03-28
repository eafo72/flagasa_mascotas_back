const express = require('express')
const app = express()
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/category')
const subcategoryRoutes = require('./routes/subcategory')
const carruselRoutes = require('./routes/carrusel')
const userTypesRoutes = require('./routes/usertypes')
const brandRoutes = require('./routes/brand')
const sizeRoutes = require('./routes/size')
const colorRoutes = require('./routes/color')
const supplierRoutes = require('./routes/supplier')
const storageRoutes = require('./routes/storage')
const orderRoutes = require('./routes/order')
const codeRoutes = require('./routes/code')
const faqRoutes = require('./routes/faq')
const seoRoutes = require('./routes/seo')
const companyRoutes = require('./routes/company')
const aboutRoutes = require('./routes/about')
const mercadopagoRoutes = require('./routes/mercadopago')
const whatsappRoutes = require('./routes/whatsapp')

const cors = require('cors')

const connectDB = require('./config/db')

require('dotenv').config()
connectDB()

app.use(cors())
app.use(express.json({limit: '25mb'}));  //sirve para recibir base64 largos
app.use(express.urlencoded({limit: '25mb'})); //sirve para recibir base64 largos

//3. Rutas
app.use('/usuario', userRoutes)
app.use('/producto', productRoutes)
app.use('/categoria', categoryRoutes)
app.use('/subcategoria', subcategoryRoutes)
app.use('/carrusel', carruselRoutes)
app.use('/tipos_usuario', userTypesRoutes)
app.use('/marca', brandRoutes)
app.use('/talla', sizeRoutes)
app.use('/color', colorRoutes)
app.use('/proveedor', supplierRoutes)
app.use('/almacen', storageRoutes)
app.use('/pedido', orderRoutes)
app.use('/codigo', codeRoutes)
app.use('/faq', faqRoutes)
app.use('/seo', seoRoutes)
app.use('/nosotros', aboutRoutes)
app.use('/empresa', companyRoutes)
app.use('/mercadopago', mercadopagoRoutes)
app.use('/whatsapp', whatsappRoutes)



app.get('/', (req, res) => res.send('FLAGASA MASCOTAS API'))

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log('El servidor está corriendo en 4000')
})

