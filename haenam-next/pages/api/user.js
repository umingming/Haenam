import { getCollection } from "@/utill/database";
import bcrypt from "bcrypt";

export default async function handler({ method, body }, response) {
    if (method === "POST") {
        const { email, password } = JSON.parse(body);
        if (!email || !password) {
            return response.status(400).json("유저 정보 필수 입력");
        }
        try {
            const userCollection = await getCollection("users");
            if (await userCollection.findOne({ email })) {
                return response.status(400).json("존재하는 유저다.");
            }

            // 암호화
            const hash = await bcrypt.hash(password, 10);
            const result = await userCollection.insertOne({
                email,
                password: hash,
            });
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json("에러났다.");
        }
    }
}
