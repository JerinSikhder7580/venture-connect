import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"


import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB_NAME);


export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    user: {
        additionalFields: {
            role: {
                defaultValue: "collaborator"
            },
            isBlocked: {
                defaultValue: false
            },
            plan: {
                defaultValue: "free"
            }
        }
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 24 * 30

        }
    },

    plugins: [
        jwt()
    ]
    //...
});