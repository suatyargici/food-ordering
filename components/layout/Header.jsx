import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { useState } from "react";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import Search from "../ui/Search";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`relative z-50 h-[5.5rem] ${
        router.asPath === "/" ? "bg-transparent" : "bg-secondary"
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between text-white">
        <Logo />
        <nav
          className={`absolute top-0 left-0 hidden h-screen w-full bg-white text-black sm:static sm:flex sm:h-auto sm:w-auto sm:bg-transparent sm:text-white  ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="flex gap-x-2">
            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <Link href="/">Home</Link>
            </li>

            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <Link href="/menu">Menu</Link>
            </li>

            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <Link href="/about">About</Link>
            </li>
            <li className="cursor-pointer px-[5px] py-[10px] uppercase hover:text-primary">
              <Link href="/reservation">Book Table</Link>
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
          <a href="" className="sm hidden md:inline-block">
            <button className="btn-primary">Order Online</button>
          </a>
          <button
            className="inline-block sm:hidden"
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
