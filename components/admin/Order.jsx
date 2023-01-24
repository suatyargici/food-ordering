import Title from "../ui/Title";
import axios from "axios";
import { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const status = ["preparing", "on the way", "delivered"];
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
    return (
      <div className="mt-5 flex-1 lg:mt-0 lg:p-8">
        <Title addClass="text-[40px]">Products</Title>
        <div className="mt-5 w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] text-center text-sm text-gray-500">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  PRODUCT ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
                <th scope="col" className="py-3 px-6">
                  PAYMENT
                </th>
                <th scope="col" className="py-3 px-6">
                  STATUS
                </th>
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order) => (
                    <tr
                      className="border-gray-700 bg-secondary transition-all hover:bg-primary"
                      key={order?._id}
                    >
                      <td className="gap-x-1 whitespace-nowrap py-4 px-6 font-medium hover:text-white ">
                        {order?._id.substring(0, 6)}...
                      </td>
                      <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                        {order?.customer}
                      </td>
                      <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                        $ {order?.total}
                      </td>

                      <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                        {order?.method === 0 ? "Cash" : "Card"}
                      </td>
                      <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                        {status[order?.status]}
                      </td>
                      <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                        <button
                          className="btn-primary !bg-success"
                          onClick={() => handleStatus(order?._id)}
                          disabled={order?.status > 1}
                        >
                          Next Stage
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
};
export default Order;
