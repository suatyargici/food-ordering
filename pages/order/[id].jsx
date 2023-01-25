import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Order = ({ order }) => {
  const [orders, setOrders] = useState([]);
  const status = order?.status;

  const statusClass = (index) => {
    const status = order?.status;

    const statusClass = (index) => {
      if (index - status < 1) return "";
      if (index - status === 1) return "animate-pulse";
      if (index - status > 1) return "";
    };
  }
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

  return (
    <div className="overflow-x-auto">
      <div className="flex min-h-[calc(100vh_-_433px)]  min-w-[1000px] flex-col items-center justify-center  p-10">
        <div className=" flex max-h-28 w-full  flex-1 items-center">
          <table className="w-full text-center text-sm text-gray-500">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ORDER ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-gray-700 bg-secondary transition-all hover:bg-primary ">
                <td className="flex items-center justify-center gap-x-1 whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  {order?._id.substring(0, 5)}...
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  {order?.customer}
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  {order?.address}
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  ${order?.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex w-full justify-between bg-primary p-10">
          <div className={`relative flex flex-col ${statusClass(0)}`}>
            <Image
              src="/images/paid.png"
              alt=""
              width={40}
              height={40}
              objectFit="contain"
            />
            <span>Payment</span>
          </div>
          <div className={`relative flex flex-col ${statusClass(1)}`}>
            <Image
              src="/images/bake.png"
              alt=""
              width={40}
              height={40}
              objectFit="contain"
            />
            <span>Preparing</span>
          </div>
          <div className={`relative flex flex-col ${statusClass(2)}`}>
            <Image
              src="/images/bike.png"
              alt=""
              width={40}
              height={40}
              objectFit="contain"
            />
            <span>On the way</span>
          </div>
          <div className={`relative flex flex-col ${statusClass(3)}`}>
            <Image
              src="/images/delivered.png"
              alt=""
              width={40}
              height={40}
              objectFit="contain"
            />
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );

  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Order;
