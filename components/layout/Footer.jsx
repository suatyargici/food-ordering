import axios from "axios";
import React, { useState, useEffect } from "react";
import Title from "../ui/Title";

const Footer = () => {
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footers`
        );
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex flex-wrap justify-center gap-y-6 text-center md:justify-between md:gap-y-0 ">
          <div className="md:flex-1">
            <Title addClass="text-[30px] font-dancing">Contact Us</Title>
            <div className="mt-3 flex flex-col gap-y-2">
              <a href={footer?.location} target="_blank" rel="noreferrer">
                <i className="fa fa-map-marker"></i>
                <span className="ml-2 inline-block">Location</span>
              </a>
              <a href={`tel:${footer?.phoneNumber}`} rel="noreferrer">
                <i className="fa fa-phone"></i>
                <span className="ml-2 inline-block">Call +01 1234567890</span>
              </a>
              <a href={`mailto:${footer?.email}`} rel="noreferrer">
                <i className="fa fa-envelope"></i>
                <span className="ml-2 inline-block">demo@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[38px] font-dancing">Feane</Title>
            <p className="mt-3">{footer?.desc}</p>
            <div className="mt-5 flex items-center justify-center gap-x-2">
              {footer?.socialMedia?.map((item) => (
                <a
                  href={item?.link}
                  className="grid h-8 w-8 place-content-center rounded-full bg-white text-secondary"
                  key={item._id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[30px] font-dancing">Opening Hours</Title>
            <div className="mt-3 flex flex-col gap-y-2">
              <div>
                <span className="ml-2 inline-block">
                  {footer?.openingHours?.day}
                </span>
              </div>
              <div>
                <span className="ml-2 inline-block">
                  {footer?.openingHours?.hour}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center">
          © 2022 All Rights Reserved By Free Html Templates
        </p>
      </div>
    </div>
  );
};

export default Footer;
