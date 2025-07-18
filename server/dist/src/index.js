"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import bodyparser from "body-parser";
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// Config
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: false}));
app.use((0, cors_1.default)());
// Routes
app.get("/", (req, res, next) => {
    res.send("This is KaryaSetu Home Route");
});
app.use("/projects", projectRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
