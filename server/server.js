const express = require("express");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("express-flash");
const MongoClient = require("mongodb").MongoClient;
const app = express();
var db;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(session({ secret: "1234", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require("dotenv").config();

MongoClient.connect(process.env.DB_URL, function (err, client) {
    if (err) return console.log(err);

    db = client.db("todoapp");
    console.log("Connected to database");

    const loginRouter = require("./routes/login");
    app.use("/api", loginRouter);

    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "id",
            passwordField: "pw",
            session: true,
            passReqToCallback: false,
        },
        (id, pw, done) => {
            db.collection("login").findOne({ id: id }, (err, result) => {
                if (err) return done(err);

                if (!result) {
                    const message = "유효하지 않은 아이디";
                    console.log("로그인 실패:", message);
                    return done(null, false, { message });
                } else if (pw !== result.pw) {
                    const message = "유효하지 않은 비밀번호";
                    console.log("로그인 실패:", message);
                    return done(null, false, { message });
                }

                console.log("로그인 성공");
                return done(null, result);
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.collection("login").findOne({ id: id }, (err, result) => {
        done(null, result);
    });
});
