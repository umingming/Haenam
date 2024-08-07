import { MongoClient, ObjectId } from "mongodb";
const url = "mongodb+srv://u13040035:java1234@cluster0.rrl2jwu.mongodb.net/";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
}

async function getCollection(name) {
    try {
        const client = await connectDB;
        const db = client.db("haenam");
        return await db.collection(name);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { connectDB, getCollection };
