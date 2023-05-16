var router = require("express").Router();
var passport = require("passport");

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/fail",
    }),
    (req, resp) => {
        resp.redirect("/");
    }
);
module.exports = router;
