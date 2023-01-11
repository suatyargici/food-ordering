import Title from "../ui/Title";
import Image from "next/image";

const Products = () => {
  const Products = () => {
    return <div>Products</div>;
    return (
      <div className="mt-5 flex-1 lg:mt-0 lg:p-8">
        <Title addClass="text-[40px]">Products</Title>
        <div className="mt-5 w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] text-center text-sm text-gray-500">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  IMAGE
                </th>
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
              <tr className="border-gray-700 bg-secondary transition-all hover:bg-primary ">
                <td className="flex items-center justify-center gap-x-1 whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  <Image src="/images/f1.png" alt="" width={50} height={50} />
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  63049e92...
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  Good Pizza
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  $ 10
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  <button className="btn-primary !bg-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};

export default Products;
