import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { useState } from "react";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  return (
    <div className="h-[5.5rem] bg-secondary">
      <div className="container mx-auto flex h-full items-center justify-between text-white">
        <Logo />
        <nav>
          <ul className="flex gap-x-2">
            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <a href="">Home</a>
            </li>
            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <a href="">Menu</a>
            </li>
            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <a href="">About</a>
            </li>
            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <a href="">Book Table</a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-x-4">
          <a href="">
            <FaUserAlt className="transition-all hover:text-primary" />
          </a>
          <a href="#">
            <FaShoppingCart className="transition-all hover:text-primary" />
          </a>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="transition-all hover:text-primary" />
          </button>
          <a href="">
            <button className="btn-primary">Order Online</button>
          </a>
        </div>
      </div>
      {isSearchModal && (
        <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
          <div className="">
            <Title addClass="text-9xl">Title</Title>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Header;
