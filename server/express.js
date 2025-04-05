import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template.js";
// import userRoutes from "./routes/user.routes.js";
// import contactRoutes from "./routes/contact.routes.js";
// import projectRoutes from "./routes/project.routes.js";
// import educationRoutes from "./routes/education.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import patientRoutes from "./routes/patient.routes.js";

const app = express();
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
// app.use("/", userRoutes);
// app.use("/", contactRoutes);
// app.use("/", projectRoutes);
// app.use("/", educationRoutes);

app.use("/", patientRoutes);
app.use("/", appointmentRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
export default app;
