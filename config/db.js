import mongoose from 'mongoose';

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous connection');
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log('New connection');

  connection.isConnected = db.connections[0].readyState;
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not disconnected');
    }
  }
};

const convertDocToObj = (doc) => {
  doc._id = doc._id.toString();
  if (doc.createdAt) doc.createdAt = doc.createdAt.toString();
  if (doc.updatedAt) doc.updatedAt = doc.updatedAt.toString();
  if (doc.images) {
    doc.images = doc.images.map(convertDocToObj);
  }
  return doc;
};

const db = { connect, disconnect, convertDocToObj };

export default db;
