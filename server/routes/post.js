var router = require("express").Router();

module.exports = function (db) {
    router.get("/", (req, res) => {
        const user_id = req.user?._id;
        if (!user_id) return res.status(401).json();

        db.collection("post")
            .find({ user_id })
            .toArray((err, result) => {
                return res.status(200).json(result);
            });
    });

    router.post("/", (req, res) => {
        const user_id = req.user?._id;
        const { title, date } = req.body;

        db.collection("counter").findOne(
            { name: "게시물갯수" },
            (err, result) => {
                if (err) console.log(err);

                const { totalPost } = result;
                db.collection("post").insertOne(
                    { _id: totalPost, title, date, user_id },
                    (err, result) => {
                        if (err) console.log(err);

                        db.collection("counter").updateOne(
                            { name: "게시물갯수" },
                            { $inc: { totalPost: 1 } }
                        );
                        return res.status(200).json(result);
                    }
                );
            }
        );
    });

    return router;
};
