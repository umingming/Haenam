var router = require("express").Router();
var passport = require("passport");

module.exports = function (db) {
    router.post("/login", (req, res, next) => {
        passport.authenticate(
            "local",
            { failureFlash: true },
            (err, user, info) => {
                if (err) {
                    return res.status(500).json();
                }
                if (!user) {
                    return res.status(401).json({ error: info });
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return res.status(401).json({ error: info });
                    }
                    return res.status(200).json({ user_id: user._id });
                });
            }
        )(req, res, next);
    });

    router.post("/register", (req, res) => {
        const { id, pw } = req.body;
        db.collection("login").findOne({ id }, (err, result) => {
            if (err) return res.status(500).json();
            if (result) return res.status(409).json();

            db.collection("login").insertOne({ id, pw }, (err) => {
                if (err) return res.status(500).json();
                return res.status(200).json();
            });
        });
    });

    return router;
};
