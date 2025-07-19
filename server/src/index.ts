import express from "express";
import dotenv from "dotenv";
// import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());

// Routes
app.get("/", (req, res, next) => {
    res.send("This is KaryaSetu Home Route");
})

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});