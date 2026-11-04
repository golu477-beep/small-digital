import mongoose from 'mongoose';

let cached = globalThis.mongoose || { conn: null, promise: null };
globalThis.mongoose = cached;

export async function connectToDatabase() {
  const mongodbUri = globalThis.process?.env?.MONGODB_URI || 'mongodb://127.0.0.1:27017/golu';

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri).then((connection) => connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}