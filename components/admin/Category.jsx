import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../form/Input";
import Title from "../ui/Title";

const Category = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      setCategories(res?.data);
    };
    getCategories();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          title: inputText,
        }
      );
      setCategories([...categories, res.data]);
      setInputText("");
      toast.success("Category Created!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (
        confirm(
          "Are you sure you want to delete this category? (This will also delete all the products in this category)"
        )
      ) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(
          categories.filter((category) => category._id !== res.data._id)
        );
        setInputText("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-5 flex-1 lg:mt-0 lg:p-8">
      <Title addClass="text-[40px]">Category</Title>
      <div className="mt-5">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Add a new Category..."
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button className="btn-primary" onClick={handleCreate}>
            Add
          </button>
        </div>
        <div className="custom-vertical-scrollbar mt-10 max-h-[300px] overflow-y-auto p-2">
          {categories?.map((category) => (
            <div className="mt-4 flex justify-between" key={category._id}>
              <b className="text-xl">{category.title}</b>
              <button
                className="btn-primary !bg-danger"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
