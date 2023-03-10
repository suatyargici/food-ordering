import React from "react";
import Home from "./home";
import Header from "../components/layout/Header";
import MenuWrapper from "../components/product/MenuWrapper";
import About from "../components/About";
import Reservation from "../components/Reservation";
import Customers from "../components/customers/Customers";
import Footer from "../components/layout/Footer";
import axios from "axios";
const Index = ({ categoryList,productList }) => {
  return (
    <div>
      <Home productList={productList}/>
      <MenuWrapper categoryList={categoryList} />
      <About />
      <Reservation />
      <Customers />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );

  return {
    props: {
      categoryList: res.data ? res.data : [],
      productList: product.data ? product.data : [],
    },
  };
};
export default Index;
