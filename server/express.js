import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js' 
import appointmentRoutes from './routes/appointment.routes.js'
import checkoutRoutes from './routes/checkout.routes.js'
import clinicRoutes from './routes/clinic.routes.js'
import patientRoutes from './routes/patient.routes.js'
import sigmapanelRoutes from './routes/sigmapanel.routes.js'
import userRoutes from './routes/user.routes.js'
import { fileURLToPath } from 'url';  
import path from 'path';


const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//api routes
app.use('/', appointmentRoutes)
app.use('/', checkoutRoutes)
app.use('/', clinicRoutes)
app.use('/', patientRoutes)
app.use('/', sigmapanelRoutes)
app.use('/', userRoutes)

//static assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client', 'build')));

export default app

