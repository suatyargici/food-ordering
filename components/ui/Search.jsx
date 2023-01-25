import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import Input from "../form/Input";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal}) => {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
        setFiltered(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };
  return (
    <div className="fixed top-0 left-0 z-50 grid h-screen w-screen place-content-center after:absolute after:top-0 after:left-0 after:h-screen after:w-screen after:bg-white after:opacity-60 after:content-['']">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="relative grid h-full w-full place-content-center">
          <div className="relative z-50 w-[370px] rounded-3xl border-2 bg-white p-10 md:w-[600px]">
            <Title addClass="text-[40px] text-center">Search</Title>
            <Input placeholder="Search..." onChange={handleSearch} />
            {products.length > 0 ? (
              <ul className="mt-4">
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <li
                      className="flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer"
                      key={product._id}
                      onClick={() => {
                        router.push(`/product/${product?._id}`);
                        setIsSearchModal(false);
                      }}
                    >
                      <div className="relative flex">
                        <Image
                          src={product?.img}
                          alt={product?.title}
                          width={48}
                          height={48}
                        />
                      </div>
                      <span className="font-bold">{product?.title}</span>
                      <span className="font-bold">${product.prices[0]}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-center font-semibold">No results found!</p>
                )}
              </ul>
            ) : (
              <div className="flex justify-center items-center mt-3">
                <PacmanLoader color="#fca311" />
              </div>
            )}
            
          
              <button
                className="absolute top-3 right-3 p-2"
                onClick={() => setIsSearchModal(false)}
              >
                <GiCancel size={24} className="text-primary transition-all" />
              </button>
           
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
