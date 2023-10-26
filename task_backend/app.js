import dotenv from "dotenv";
dotenv.config()
import  express  from "express";
import cors from "cors";
import connectDb from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS policy
app.use(cors());

// Database Connection
connectDb(DATABASE_URL);

// JSON
 app.use(express.json());

 

// Load Routes 
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, ()=>{
    console.log(`Server is Listening at http://localhost:${port}`);
})