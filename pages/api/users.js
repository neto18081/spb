import client, { createUser, retrieveUsers } from "../../utils/db";

export default async function Users(req, res) {
  try {
    await client.connect();

    if (req.method == "GET") await retrieveUsers(client, res);

    if (req.method == "POST") await createUser(client, req.body, res);
  } catch (err) {
    res.json({
      status: 404,
      message: "Bad request",
    });
  } finally {
    await client.close();
  }
}
