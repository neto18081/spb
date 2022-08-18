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

export async function createProduct(client, newListing, res) {
  await client.db("spb").collection("products").insertOne(newListing);
}

export async function getProducts(client, query) {
  let array = [];

  if (JSON.stringify(query) == "{}") {
    await client
      .db("spb")
      .collection("products")
      .find({})
      .forEach((d) => array.push(d));
  } else {
    array = await client.db("spb").collection("products").findOne(query);
  }
  return array;
}

export async function updateProduct(client, body, res) {
  const updated = await client
    .db("spb")
    .collection("products")
    .updateOne(
      { id: body.id },
      {
        $set: {
          avaliacoes: body.avaliacao,
        },
      }
    );

  res.json({
    status: 200,
    data: updated,
  });
}

export default client;
