import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";

const AddProduct = ({ setIsProductModal }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("pizza");
  const [prices, setPrices] = useState([]);

  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    console.log(imageSrc);
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqm3i1spk/image/upload",
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleExtra = () => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions([...extraOptions, extra]);
        setExtra("");
      }
    }
  };

  console
  return (
    <div className="fixed top-0 left-0 z-50 grid h-screen w-screen place-content-center after:absolute after:top-0 after:left-0 after:h-screen after:w-screen after:bg-white after:opacity-60 after:content-['']">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="relative grid h-full w-full place-content-center">
          <div className="relative z-50 w-[370px] rounded-3xl  border-2 bg-white p-10 md:w-[600px]">
            <Title addClass="text-[40px] text-center">Add a New Product</Title>

            <div className="mt-6 flex flex-col text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="file"
                  onChange={(e) => handleOnChange(e)}
                  className="hidden"
                />
                <button className="btn-primary pointer-events-none !rounded-none !bg-blue-600">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="mt-4 flex flex-col text-sm">
              <span className="mb-[2px] font-semibold">Title</span>
              <input
                type="text"
                className="border-2 p-1 px-1 text-sm outline-none"
                placeholder="Write a title..."
                name="text"
                onChange={(e) =>
                  setTitle({ ...extra, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mt-4 flex flex-col text-sm">
              <span className="mb-[2px] font-semibold">Description</span>
              <textarea
                className="border-2 p-1 px-1 text-sm outline-none"
                placeholder="Write a title..."
                name="price"
                onChange={(e) =>
                  setDesc({ ...extra, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="mt-4 flex flex-col text-sm">
              <span className="mb-[2px] font-semibold">Select Category</span>
              <select
                className="border-2 p-1 px-1 text-sm outline-none"
                placeholder="Write a title..."
              >
                <option value="1">Category 1</option>
                <option value="1">Category 1</option>
                <option value="1">Category 1</option>
                <option value="1">Category 1</option>
              </select>
            </div>

            <div className="mt-4 flex w-full flex-col text-sm">
              <span className="mb-[2px] font-semibold">Prices</span>
              <div className="flex w-full flex-wrap justify-between gap-6 md:flex-nowrap">
                <input
                  type="number"
                  className="w-36 border-b-2 p-1 px-1 pl-0 text-sm outline-none"
                  placeholder="small"
                />
                <input
                  type="number"
                  className="w-36 border-b-2 p-1 px-1 pl-0 text-sm outline-none"
                  placeholder="medium"
                />
                <input
                  type="number"
                  className="w-36 border-b-2 p-1 px-1 pl-0 text-sm outline-none"
                  placeholder="large"
                />
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col text-sm">
              <span className="mb-[2px] font-semibold">Extra</span>
              <div className="flex  w-full flex-wrap gap-6 md:flex-nowrap">
                <input
                  type="text"
                  className="w-36 border-b-2 p-1 px-1 pl-0 text-sm outline-none"
                  placeholder="item"
                  name="text"
                  onChange={(e) =>setExtra({...extra,[e.target.name]:e.target.value})}
                />
                <input
                  type="number"
                  className="w-36 border-b-2 p-1 px-1 pl-0 text-sm outline-none"
                  placeholder="price"
                  name="price"
                  onChange={(e) =>setExtra({...extra,[e.target.name]:e.target.value})}

                />
                <button className="btn-primary ml-auto" onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className="mt-2">
                {extraOptions.map((_, index) => (
                  <span
                    className="inline-block rounded-xl border border-orange-500  p-1 text-xs text-orange-500 cursor-pointer"
                    key={index}
                    onClick={() =>
                      setExtraOptions(
                        extraOptions.filter((_, i) => i !== index)
                      )
                    }
                  >
                    {_.text} - {_.price}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end" onClick={handleCreate}>
              <button className="btn-primary !bg-success ">Create</button>
            </div>
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
