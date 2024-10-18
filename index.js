import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import Controller from "./src/controllers/controller.js";
import { uploadFile } from "./src/middleware/fileUpload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import auth from "./src/middleware/authSession.middleware.js";
const app = express();

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejsLayouts);
app.use(express.json());


const controller = new Controller();
const userController = new UserController();

app.get("/", controller.getHome);
app.get("/login", controller.getLogin);
app.get("/job", controller.getJob);
app.get("/jobDetails/:id", controller.getDetails);
app.get("/createJob", auth ,controller.createNewJob);
app.post("/apply/:id", uploadFile.single("resume"), controller.apply);
app.post("/postJob",auth ,controller.postNewJob);
app.get("/getApplicants/:jobId",auth ,controller.getApplicants);
app.get("/updateJob/:id", auth, controller.getUpdateJob);
app.post("/updateJob/:id", auth, controller.postUpdateJob);
app.get("/deleteJob/:id", auth, controller.deleteJob);
app.post("/register", userController.postRegister);
app.post("/login", userController.postLogin);
app.get("/logout", userController.getLogout);
app.get("/search", controller.searchJob);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
