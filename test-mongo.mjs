import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(uri, {
  autoSelectFamily: false,
});

try {
  await client.connect();
  await client.db("bazardor7").command({ ping: 1 });
  console.log("MongoDB connected successfully!");
} catch (error) {
  console.error("MongoDB connection failed:", error);
} finally {
  await client.close();
}