import Category from "../../../models/Category";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory,{ message: "eklendi" });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
