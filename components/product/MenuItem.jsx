import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
const MenuItem = ({ product }) => {
  return (
    <div className="rounded-3xl bg-secondary">
      <div className="grid  h-[210px] w-full place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl bg-[#f1f2f3]">
      <Link href="/product">
          <div className="relative w-36 h-36 hover:scale-110 transition-all">
            <Image src={product.img} alt="" layout="fill" priority/>
          </div>
        </Link>
      </div>
      <div className="p-[25px] text-white">
      <h4 className="text-xl font-semibold">{product.title}</h4>
        <p className="text-[15px]">{product.desc}</p>
        <div className="mt-4 flex items-center justify-between">
        <span>${product.prices[0]}</span>
          <button className="btn-primary grid !h-10 !w-10 place-content-center !rounded-full !p-0">
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
