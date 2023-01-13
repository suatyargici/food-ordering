import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
 
  const registerSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required.")
      .min(3, "Full name must be at least 3 characters."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase, one lowercase, one number and one special character."
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match."),
  });

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
    } catch (err) {
      console.log(err);
    
     actions.resetForm(); 
  };
}

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: registerSchema,
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
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Password Again",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];
  
  

  return (
    <div className="container mx-auto">
      <form
        className="my-20 mx-auto flex w-full flex-col items-center md:w-1/2"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Register</Title>
        <div className="flex w-full flex-col gap-y-3">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="mt-6 flex w-full flex-col gap-y-3">
          <button className="btn-primary" type="submit">REGISTER</button>
          <Link href="/auth/login">
            <span className="cursor-pointer text-sm text-secondary underline">
              Do you have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
