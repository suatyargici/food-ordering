import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { useRouter } from "next/router";

const Order = () => {
    const { push } = useRouter()
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
            // setTimeout(() => {
            //     push(`/order/${id}`)
            // }, 1200)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="overflow-x-auto custom-vertical-scrollbar ml-5 mt-5" >
            <Title className="text-center mb-5">Orders</Title>
            <div className="overflow-x-auto custom-vertical-scrollbar max-h-[330px] mx-auto w-full ">
                <table className="m-5 text-sm text-center text-gray-500 mx-auto rounded-t-2xl w-[670px] md:w-[940px]">
                    <thead className="sticky top-0 z-10 text-xs text-primary bg-secondary uppercase border-white border-b-8 ">
                        <tr>

                            <th scope="col" className="py-3 px-6 hover:text-white">
                                PRODUCT ID
                            </th>
                            <th scope="col" className="py-3 px-6 hover:text-white">
                                CUSTOMER
                            </th>
                            <th scope="col" className="py-3 px-6 hover:text-white">
                                TOTAL
                            </th>
                            <th scope="col" className="py-3 px-6 hover:text-white">
                                PAYMENT
                            </th>
                            <th scope="col" className="py-3 px-6 hover:text-white">
                                STATUS
                            </th>
                            <th scope="col" className="py-3 px-6 hover:text-white">
                                ACTİON
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 &&
                            orders
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((order) => (
                                    <tr
                                        key={order?._id}
                                        className="bg-primary hover:bg-secondary transition-all border-b-white border-b-2"
                                    >
                                        <td className="py-4 px-6 font-medium whitespace-nowrap  hover:text-white ">
                                            {order?._id.substring(0, 6)}...
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            {order?.customer}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            ${order?.total}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            ${order?.method === 0 ? "Cash" : "Card"}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            {status[order?.status]}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
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

export default Order;