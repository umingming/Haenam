import { connectDB, getCollection } from "@/utill/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, //30일
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                Object.assign(token, { user });
            }
            return token;
        },
        async session({ session, token: { user } }) {
            return Object.assign(session, { user });
        },
        async signIn({ user }) {
            const users = await getCollection('users');
            const { email } = user;
            const existingUser = await users.findOne({ email });

            if (!existingUser) {
                await users.insertOne(user);
            }
            return true;
        },
    },

    secret: process.env.SECRET,
    adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
