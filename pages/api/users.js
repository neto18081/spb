import client, { createUser, getUser } from "../../utils/db";

export default async function Users(req, res) {
  try {
    await client.connect();

    // PASSA UMA QUERY PARA FILTRAR
    if (req.method == "GET") await getUser(client, req.query, res);

    // PASSA NO BODY INFORMAÇÕES PARA CRIAR O USUÁRIO
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
