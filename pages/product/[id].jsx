import Image from "next/image";
import React, { useState } from "react";
import Title from "../../components/ui/Title";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Index = ({food}) => {
  const itemsExtra = [
    {
      id: 1,
      name: "Extra 1",
      price: 1,
    },
    {
      id: 2,
      name: "Extra 2",
      price: 2,
    },
    {
      id: 3,
      name: "Extra 3",
      price: 3,
    },
  ];

  const [prices, setPrices] = useState([10, 20, 30]);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...foodItems[0], extras, price, quantity: 1 }));
  };

  const foodItems = [
    {
      id: 1,
      name: "Pizza 1",
      price: 10,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda fugit corporis ex laboriosam tenetur at ad aspernatur",
      extraOptions: [
        {
          id: 1,
          name: "Extra 1",
          price: 1,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-5 py-20 md:h-[calc(100vh_-_88px)] ">
      <div className="relative mx-auto h-36 w-36 md:h-[80%] md:w-[80%] md:flex-1">
        <Image src={food.img} alt="" layout="fill" objectFit="contain" />
      </div>
      <div className="text-center md:flex-1 md:text-start">
        <Title addClass="text-6xl font-dancing">{food?.title}</Title>
        <span className="my-4 inline-block text-2xl font-bold text-primary underline underline-offset-1">
          ${food?.prices[0]}
        </span>
        <p className="my-4 text-sm md:pr-24">
      {food?.desc}
        </p>
        <div>
          <h4 className="text-xl font-bold">Choose the size</h4>
          <div className="flex items-center justify-center gap-x-20 md:justify-start">
            <div
              className="relative h-8 w-8 cursor-pointer"
              onClick={() => handleSize(0)}
            >
              <Image src="/images/size.png" alt="" layout="fill" />
              <span className="absolute top-0 -right-6 rounded-full bg-primary px-[5px] text-xs font-medium">
                Small
              </span>
            </div>
            <div
              className="relative h-12 w-12 cursor-pointer"
              onClick={() => handleSize(1)}
            >
              <Image src="/images/size.png" alt="" layout="fill" />
              <span className="absolute top-0 -right-6 rounded-full bg-primary px-[5px] text-xs font-medium">
                Medium
              </span>
            </div>
            <div
              className="relative h-16 w-16 cursor-pointer"
              onClick={() => handleSize(2)}
            >
              <Image src="/images/size.png" alt="" layout="fill" />
              <span className="absolute top-0 -right-6 rounded-full bg-primary px-[5px] text-xs font-medium">
                Large
              </span>
            </div>
          </div>
        </div>
        <div className="my-6 flex justify-center gap-x-4 md:justify-start">
          {extraItems.map((item) => (
            <label className="flex items-center gap-x-1" key={item.id}>
              <input
                type="checkbox"
                className="h-5 w-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.name}</span>
            </label>
          ))}
        </div>
        <button className="btn-primary" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      food: res.data ? res.data : null,
    },
  };
};

export default Index;
