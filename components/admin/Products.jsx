import Title from "../ui/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product Deleted!");
          getProducts();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mt-5 flex-1 lg:mt-0 lg:p-8">
      <Title addClass="text-[40px]">Products</Title>
      <div className="mt-5 w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] cursor-pointer text-center text-sm text-gray-500">
          <thead className="bg-gray-700 text-xs uppercase text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                TITLE
              </th>
              <th scope="col" className="py-3 px-6">
                PRICE
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  className="border-gray-700 bg-secondary transition-all hover:bg-primary"
                  key={product._id}
                >
                  <td className="flex items-center justify-center gap-x-1 whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    {product._id.substring(0, 5)}...
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    {product.title}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    $ {product.prices[0]}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    <button
                      className="btn-primary !bg-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
