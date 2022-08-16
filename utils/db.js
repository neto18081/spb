import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:18081@cluster0.1ft9d.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// async function listDatabases(client) {
//   let databasesList = await client.db().admin().listDatabases();

//   const dbs = [];
//   databasesList.databases.forEach((db) => dbs.push(db.name));
//   return dbs;
// }

export async function createUser(client, newListing, res) {
  const result = await client
    .db("spb")
    .collection("users")
    .insertOne(newListing);

  res.json({
    status: 200,
    data: {
      id: result.insertedId,
    },
  });
}

export async function retrieveUsers(client, res) {
  const users = await client.db("spb").collection("users").find({});

  res.json({
    status: 200,
    users: users,
  });
}

export default client;
