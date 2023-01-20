import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import Input from "../form/Input";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal }) => {
    const [file, setFile] = useState();
    const [imageSrc, setImageSrc] = useState();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("pizza");
    const [prices, setPrices] = useState([]);

    const [extra, setExtra] = useState("");
    const [extraOptions, setExtraOptions] = useState([]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
                setCategories(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])


    const handleExtra = (e) => {
        if (extra) {
            if (extra.text && extra.price) {
                setExtraOptions((prev) => [...prev, extra]);
            }
        }
    };

    const handleOnChange = (changeEvent) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setFile(changeEvent.target.files[0]);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    };

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Vip-kahvehane");

        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dvnhkkop7/image/upload", data);

            const { url } = uploadRes.data
            const newProduct = {
                img: url,
                title,
                desc,
                category: category.toLowerCase(),
                prices,
                extraOptions,
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct)
            if (res.status === 200) {
                setIsProductModal(false)
                toast.success("Ürün Oluşturuldu")
                setTimeout(() => {
                    window.location.reload()
                }, 1300)
            }

        } catch (err) {
            console.log(err);
        }
    };

    const changePrice = (e, index) => {
        const currentPrices = prices
        currentPrices[index] = e.target.value
        setPrices(currentPrices)
    }

    return (
        <div className="fixed -top-1 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-[#f3f3f3] after:absolute after:top-0 after:left-0 after:opacity-90 grid place-content-center">
            <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
                <div>
                    <div className="w-full h-full grid place-content-center relative">
                        <div className="relative z-50 md:w-[600px] w-[370px] bg-white max-h-[670px] border-2 p-10 rounded-3xl custom-vertical-scrollbar overflow-y-auto overflow-x-hidden">
                            <Title className=" text-[30px] text-center -mt-10">
                                Add a New Product
                            </Title>
                            <div className="flex flex-row justify-between items-center text-sm md:-mt-2 mt-0">
                                <label className="flex flex-row justify-between items-center w-full">
                                    <input
                                        type="file"
                                        onChange={handleOnChange}
                                        className="hidden"
                                    />
                                    <button
                                        className={`bg-success  px-2 py-2 pointer-events-none
                                `}
                                    >
                                        Choose an Image
                                    </button>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {imageSrc && (
                                        <img src={imageSrc} alt="" className="w-28 h-28" />
                                    )}
                                </label>
                            </div>
                            <div className="flex flex-col text-sm mt-2">
                                <span className="font-semibold mb-[2px]">Title</span>
                                <Input
                                    type="text"
                                    className="!h-10"
                                    placeholder="Write a title..."
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col text-sm mt-4">
                                <span className="font-semibold mb-[2px]">Description</span>
                                <textarea
                                    className="h-10 focus:bg-white outline-secondary border-secondary caret-secondary bg-white  w-full border  px-4 peer pt-3"
                                    placeholder="Write a title..."
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col text-sm mt-4">
                                <span className="font-semibold mb-[2px]">Select Category</span>
                                <select
                                    className="border border-secondary p-1 text-sm px-1 outline-none"
                                    placeholder="Write a title..."
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.length > 0 && categories.map((category) => (
                                        <option key={category._id} value={category.title}>{category.title}</option>
                                    ))}

                                </select>
                            </div>

                            <div className="flex flex-col text-sm mt-4 w-full">
                                <span className="font-semibold mb-[2px]">Prices</span>

                                    <div
                                        className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap items-center">
                                        <Input
                                            onChange={(e) => changePrice(e, 0)}
                                            type="number" className="!h-10" placeholder="small" />
                                        <Input
                                            onChange={(e) => changePrice(e, 1)}
                                            type="number" className="!h-10" placeholder="medium" />
                                        <Input
                                            onChange={(e) => changePrice(e, 2)}
                                            type="number" className="!h-10" placeholder="large" />
                                    </div>

                            </div>
                            <div className="flex flex-col text-sm mt-2 w-full py-2">
                                <span className="font-semibold mb-[2px]">Extra</span>
                                <div className="flex  gap-6 w-full md:flex-nowrap flex-wrap">
                                    <input
                                        type="text"
                                        className="border-b-2 border-secondary p-1 pl-0 text-sm px-1 outline-none w-36"
                                        placeholder="item"
                                        name="text"
                                        onChange={(e) =>
                                            setExtra({ ...extra, [e.target.name]: e.target.value })
                                        }
                                    />

                                    <input
                                        type="number"
                                        className="border-b-2 border-secondary p-1 pl-0 text-sm px-1 outline-none w-36"
                                        placeholder="price"
                                        name="price"
                                        onChange={(e) =>
                                            setExtra({ ...extra, [e.target.name]: e.target.value })
                                        }
                                    />
                                    <button className="btn-primary ml-auto" onClick={handleExtra}>
                                        Add
                                    </button>
                                </div>
                                <div className="mt-2 gap-2 flex justify-start items-center flex-wrap w-full">
                                    {extraOptions.map((item, index) => (
                                        <span
                                            onClick={() => {
                                                setExtraOptions(extraOptions.filter((_, i) => i !== index));
                                            }}
                                            key={index}
                                            className=" mt-1 cursor-pointer inline-block border md:ml-0 ml-16 border-orange-500 text-orange-500  p-1 rounded-xl text-xs"
                                        >
                                            {item.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex md:mt-5 mt-2">
                                <button
                                    className="w-full rounded-xl p-1.5 !bg-success"
                                    onClick={handleCreate}
                                >
                                    Create
                                </button>
                            </div>
                            <button
                                className="absolute top-5 right-5"
                                onClick={() => setIsProductModal(false)}
                            >
                                <AiOutlineClose className="lix w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AddProduct;
