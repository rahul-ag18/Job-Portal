export default function auth(req, res, next) {
    if (req.session.userEmail) {
        next();
    }else {
        res.render("oops", {
          err: "only recruiter is allowed to access this page, login as recruiter to continue",
        });
    }
}