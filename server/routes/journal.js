var router = require("express").Router();

module.exports = function (db) {
    router.get("/", (req, res) => {
        console.log(req);
        const user_id = req.user._id;
        if (!user_id) return res.status(401).json();

        db.collection("journal")
            .find({ user_id })
            .toArray((err, result) => {
                return res.status(200).json(result);
            });
    });

    router.post("/", (req, res) => {
        const user_id = req.user._id;
        const { content, date } = req.body;

        db.collection("counter").findOne({ name: "journal" }, (err, result) => {
            if (err) console.log(err);

            const { total } = result;
            db.collection("journal").insertOne(
                { _id: total, content, date, user_id },
                (err, result) => {
                    if (err) console.log(err);

                    db.collection("counter").updateOne(
                        { name: "journal" },
                        { $inc: { total: 1 } }
                    );
                    return res.status(200).json(result.ops);
                }
            );
        });
    });

    router.put("/", (req, res) => {
        const { _id, ...param } = req.body;
        db.collection("journal").findOneAndUpdate(
            { _id },
            { $set: { ...param } },
            { returnOriginal: false },
            (err, result) => {
                if (err) console.log(err);
                return res.status(200).json(result.value);
            }
        );
    });

    router.delete("/:id", (req, res) => {
        const _id = +req.params.id;
        const user_id = req.user._id;
        db.collection("journal").deleteOne({ _id, user_id }, (err, result) => {
            if (err) console.log(err);
            return res.status(200).json(result);
        });
    });

    return router;
};
