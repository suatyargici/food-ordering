import React, { useState ,useEffect} from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Footer = () => {
  const [iconName, setIconName] = useState("fa fa-");
  const [linkAddress, setLinkAddress] = useState("https://");
  const [footerData, setFooterData] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footers`
        );
        setFooterData(res.data[0]);
        setSocialMediaLinks(res.data[0].socialMedia);
      } catch (err) {
        console.log(err);
      }
    };
    getFooterData();
  }, []);
  const footerSchema = Yup.object({
    location: Yup.string().required("Location is required."),
    phoneNumber: Yup.string()
      .required("Phone Number is required.")
      .min(10, "Phone number must be at least 10 characters."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid."),
    desc: Yup.string().required("Description is required."),
    day: Yup.string().required("Day is required."),
    time: Yup.string().required("Time is required."),
  });

  const [icons, setIcons] = useState([
    "fa fa-facebook",
    "fa fa-twitter",
    "fa fa-instagram",
  ]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: footerData?.location,
        email: footerData?.email,
        phoneNumber: footerData?.phoneNumber,
        desc: footerData?.desc,
        day: footerData?.openingHours?.day,
        time: footerData?.openingHours?.hour,
      },
      onSubmit,
      validationSchema: footerSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
        {
          location: values.location,
          email: values.email,
          phoneNumber: values.phoneNumber,
          desc: values.desc,
          openingHours: {
            day: values.day,
            hour: values.time,
          },
          socialMedia: socialMediaLinks,
        }
      );
      if (res.status === 200) {
        toast.success("Footer updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="mt-5 flex-1 lg:mt-0 lg:p-8" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Footer Settings</Title>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Input placeholder="Link Address" value="https://" onChange="" />
          <Input
            placeholder="Link Address"
            onChange={(e) => setLinkAddress(e.target.value)}
            value={linkAddress}
          />
          <Input
            placeholder="Icon Name"
            onChange={(e) => setIconName(e.target.value)}
            value={iconName}
          />
          <button
            className="btn-primary"
            type="button"
            onClick={() => {
              setIcons([...icons, iconName]);
              setIconName("fa fa-");
            }}
          >
            Add
          </button>
        </div>
        <ul className="flex items-center gap-6">
          {socialMediaLinks?.map((item, index) => (
            <li key={index} className="flex items-center">
              <i className={`${item.icon} text-2xl`}></i>
              <button
                className="text-danger"
                onClick={() => {
                  setIcons((prev) => prev.filter((item, i) => i !== index));
                }}
                type="button"
              >
                <i className="fa fa-trash ml-2 text-xl"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default Footer;
