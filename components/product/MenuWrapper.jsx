import React, { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="container mx-auto  mb-16">
      <div className="flex w-full flex-col items-center">
        <Title addClass="text-[40px]">Our Menu</Title>
        <div className="mt-10">
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                className={`rounded-3xl px-6  py-2 ${
                  index === active && "bg-secondary text-white"
                }`}
                key={category._id}
                onClick={() => setActive(index)}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  );
};

export default MenuWrapper;
