import Image from "next/image";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Account from "../../components/profile/Account";
import Password from "../../components/profile/Password";
import Order from "../../components/profile/Order";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useEffect} from "react";

const Profile = () => {
  const [tabs, setTabs] = useState(0);

  const profileSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required.")
      .min(4, "Full name must be at least 4 characters."),
    phoneNumber: Yup.string()
      .required("Phone Number is required.")
      .min(9, "Phone number must be at least 9 characters."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid."),
    address: Yup.string().required("Address is required."),
    job: Yup.string().required("Job is required."),
    bio: Yup.string().required("Bio is required."),
  });
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { push } = useRouter();
  const { data: session } = useSession();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };

  useEffect(() => {
    if (!session) {
      push("/auth/login");
    }
  }, [session, push]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        job: "",
        bio: "",
      },
      onSubmit,
      validationSchema: profileSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Your Address",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Your Job",
      value: values.job,
      errorMessage: errors.job,
      touched: touched.job,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Your Bio",
      value: values.bio,
      errorMessage: errors.bio,
      touched: touched.bio,
    },
  ];
  return (
    <div className="flex sm:px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col max-[768px]:items-center p-10">
      <div className="w-70 sm:w-80 sm:flex-shrink-0">
        <div className="relative flex flex-col items-center border border-b-0 px-10 py-5">
          <Image
            src="/images/client2.jpg"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="mt-1 text-2xl">John Doe</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`w-full cursor-pointer border p-3 transition-all hover:bg-primary hover:text-white ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li
            className={`w-full cursor-pointer border p-3 transition-all hover:bg-primary hover:text-white ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li
            className={`w-full cursor-pointer border p-3 transition-all hover:bg-primary hover:text-white ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`w-full cursor-pointer border p-3 transition-all hover:bg-primary hover:text-white ${
              tabs === 3 && "bg-primary text-white"
            }`}
            onClick={handleSignOut}
          >
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        {tabs === 0 && <Account />}
        {tabs === 1 && <Password />}
        {tabs === 2 && <Order />}
      </div>
    </div>
  );
};

export default Profile;
