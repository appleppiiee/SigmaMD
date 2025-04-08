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


const app = express()
//const CURRENT_WORKING_DIR = process.cwd()

/*const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//...*/
/////////////////
/*app.get('/', (req, res) => {
res.status(200).send(Template()) 
})*/

//...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', appointmentRoutes)
app.use('/', checkoutRoutes)
app.use('/', clinicRoutes)
app.use('/', patientRoutes)
app.use('/', sigmapanelRoutes)
app.use('/', userRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app

