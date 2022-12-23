import Image from "next/image";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";

const Search = ({ setIsSearchModal}) => {
  return (
    <div className="fixed top-0 left-0 z-50 grid h-screen w-screen place-content-center after:absolute after:top-0 after:left-0 after:h-screen after:w-screen after:bg-white after:opacity-60 after:content-['']">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="relative grid h-full w-full place-content-center">
          <div className="relative z-50 w-[370px] rounded-3xl border-2 bg-white p-10 md:w-[600px]">
            <Title addClass="text-[40px] text-center">Search</Title>
            <input
              type="text"
              placeholder="Search..."
              className="my-10 w-full border"
            />
            <ul>
              <li className="flex items-center justify-between p-1 transition-all hover:bg-primary">
                <div className="relative flex">
                  <Image src="/images/f1.png" alt="" width={48} height={48} />
                </div>
                <span className="font-bold">Good Pizza</span>
                <span className="font-bold">$10</span>
              </li>
              <li className="flex items-center justify-between p-1 transition-all hover:bg-primary">
                <div className="relative flex">
                  <Image src="/images/f1.png" alt="" width={48} height={48} />
                </div>
                <span className="font-bold">Good Pizza</span>
                <span className="font-bold">$10</span>
              </li>
              <li className="flex items-center justify-between p-1 transition-all hover:bg-primary">
                <div className="relative flex">
                  <Image src="/images/f1.png" alt="" width={48} height={48} />
                </div>
                <span className="font-bold">Good Pizza</span>
                <span className="font-bold">$10</span>
              </li>
            </ul>
           
            
          
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
