const express = require("express");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

const MongoClient = require("mongodb").MongoClient;
const app = express();
var db;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(session({ secret: "1234", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
require("dotenv").config();

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
                    return done(null, false, "id");
                } else if (pw !== result.pw) {
                    return done(null, false, "pw");
                }
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

MongoClient.connect(process.env.DB_URL, function (err, client) {
    if (err) return console.log(err);

    db = client.db("todoapp");
    console.log("Connected to database");

    const loginRouter = require("./routes/login")(db);
    const postRouter = require("./routes/post")(db);
    const journalRouter = require("./routes/journal")(db);
    app.use("/", loginRouter);
    app.use("/post", postRouter);
    app.use("/journal", journalRouter);

    app.listen(process.env.PORT, () => {
        console.log("Haenam Server is running on port", process.env.PORT);
    });
});
