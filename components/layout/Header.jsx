import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { useState } from "react";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import Search from "../ui/Search";
import { useRouter } from "next/router";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const router = useRouter();


  return (
    <div  className={`h-[5.5rem] z-50 relative ${
      router.asPath === "/" ? "bg-transparent" : "bg-secondary"
    }`}>
      <div className="container mx-auto flex h-full items-center justify-between text-white">
        <Logo />
            <nav
              className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden  ${
                isMenuModal === true && "!grid place-content-center"
              }`} 
        >
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
            {isMenuModal && (
            <button
              className="absolute  top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          )}
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
          <a href="" className="md:inline-block hidden sm">
            <button className="btn-primary">Order Online</button>
          </a>
          <button
              className="sm:hidden inline-block"
              onClick={() => setIsMenuModal(true)}
            >
              <GiHamburgerMenu className="text-xl transition-all hover:text-primary" />
            </button>
        </div>
        {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
      </div>
     
    </div>
  );
};

export default Header;
