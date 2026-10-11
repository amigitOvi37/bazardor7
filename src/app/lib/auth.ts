import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI

let client: MongoClient | undefined
let db

if (uri) {
  try {
    client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
      tlsInsecure: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    await client.connect()
    db = client!.db("bazardor7db")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    db = undefined
  }
} else {
  db = undefined
}

const database = db ? mongodbAdapter(db, { client }) : undefined

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database,
})