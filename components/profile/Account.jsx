import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Account = ({ user }) => {
  const profileSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required.")
      .min(3, "Full name must be at least 3 characters."),
    phoneNumber: Yup.string()
      .required("Phone Number is required.")
      .min(10, "Phone number must be at least 10 characters."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid."),
    address: Yup.string().required("Address is required."),
    job: Yup.string().required("Job is required."),
    bio: Yup.string().required("Bio is required."),
  });
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
    } catch (err) {
      console.log(err);
    }
    actions.resetForm();
  };
 
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize:true,
      initialValues: {
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        address: user?.address,
        job: user?.job,
        bio: user?.bio,
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
    <form className="mt-5 flex-1 lg:mt-0 lg:p-8" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Account Settings</Title>
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
      <button
        className="btn-primary mt-4"
        type="submit"
        onClick={() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
      >
        Update
      </button>
    </form>
  );
};

export default Account;
