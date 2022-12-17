const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Your mongodb uri is not defined!");
}



let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

module.exports = async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      bufferCommands:false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((client) => {
      return client
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}
