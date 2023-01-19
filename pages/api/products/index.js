
import Product from "../../../models/Products";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      res.status(200).json(newProduct,{ message: "eklendi" });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
