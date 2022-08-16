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

export async function getUser(client, query, res) {
  const users = await client.db("spb").collection("users").findOne(query);

  res.json({
    status: 200,
    users: users,
  });
}

export async function updateUser(client, body, res) {
  const updated = await client
    .db("spb")
    .collection("users")
    .updateOne({ email: body.email }, { $set: { pedidos: body.pedidos } });

  res.json({
    status: 200,
    data: updated,
  });
}

export default client;
