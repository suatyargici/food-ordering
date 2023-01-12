const handler = async (req, res) => {
  res.status(200).json({ message: "This is the users API route" });
};

export default handler;