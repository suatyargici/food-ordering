import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Card = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    method: 0,
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure to order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Please login first.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full flex-1 items-center overflow-x-auto p-10 md:min-h-[calc(100vh_-_433px)]">
          <table className="w-full min-w-[1000px] text-center text-sm text-gray-500">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  PRODUCT
                </th>
                <th scope="col" className="py-3 px-6">
                  EXTRAS
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody>
            {cart.products.map((product, index) => (
                <tr
                  className="border-gray-700 bg-secondary transition-all hover:bg-primary"
                  key={index}
                >
                  <td className="flex items-center justify-center gap-x-1 whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  <Image src={product?.img} alt="" width={50} height={50} />
                    <span>{product.name}</span>
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    {product.extras.map((item) => (
                      <span key={item.id}>{item.text} </span>
                    ))}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    ${product.price}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                    {product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex min-h-[calc(100vh_-_433px)] w-full flex-col justify-center bg-secondary p-12 !text-center text-white   md:w-auto md:text-start">
          <Title addClass="text-[40px]">CART TOTAL</Title>

          <div className="mt-6">
            <b>Subtotal: </b>${cart.total} <br />
            <b className=" my-1 inline-block">Discount: </b>$0.00 <br />
            <b>Total: </b>${cart.total}
          </div>

          <div>
            <button
              className="btn-primary mt-4 w-52 md:w-auto"
             onClick={createOrder}
            >
              CHECKOUT NOW!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Card;
