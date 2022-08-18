import client, {
  createProduct,
  getProducts,
  updateProduct,
} from "../../utils/db";
import { DataProducts } from "../../components/Arquivos";

export default async function Products(req, res) {
  try {
    await client.connect();

    if (req.method == "GET") {
      const products = await getProducts(client, req.query);
      res.json({
        status: 200,
        data: products,
      });
    }

    if (req.method == "POST") {
      const array = [];
      // PARA RESETAR O BANCO
      // await client.db("spb").collection("products").deleteMany({});
      for (let i in DataProducts) {
        await createProduct(client, DataProducts[i], res);
        array.push(DataProducts[i]);
      }

      res.json({
        status: 200,
        message: "Produtos cadastrados com sucesso!",
        data: array,
      });
    }

    if (req.method == "PUT") {
      await updateProduct(client, req.body, res);
    }
  } catch (err) {
    res.json({
      status: 404,
      message: "Bad request",
    });
  } finally {
    await client.close();
  }
}
