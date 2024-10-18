import { UserModel } from "../models/user.model.js";
import JobModel from "../models/job.model.js";
export default class UserController {

    postRegister(req, res) {
        if (req.session.userEmail) {
            req.session.destroy();
        }
        const newUser = UserModel.createUser(req.body);
        console.log(newUser);
        res.redirect("/login");
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.checkUser(email, password);
        if (user) {
            console.log(user);
            req.session.userEmail = user.email;
            req.session.userName = user.name;
            let jobs = JobModel.getAllJobs(); 

            res.render("job", {
                jobs: jobs,
                userEmail: req.session.userEmail,
                userName: req.session.userName
            });
        } else {
            res.render("oops", { err: "user not found pls register" });
        }
    }
    getLogout(req, res) {
        req.session.destroy();
        res.redirect("/login");
    }
}