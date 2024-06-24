import { MongoClient } from "mongodb";

let _db: MongoClient | null = null;

export const initDb = async (startServer: () => void) => {
  console.log("Initializing database...");
  if (_db) {
    console.log("Database is already initialized!");
    return startServer();
  }
  try {
    _db = await MongoClient.connect(process.env.DATABASE_URL || "");
    startServer();
  } catch (err) {
    console.error(err);
  }
};

export const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};
