import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Admin = () => {
  const { push } = useRouter();

  const adminSchema = Yup.object({
    username: Yup.string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters."),
    password: Yup.string()
      .required("Password is required.")
      .min(5, "Password must be at least 8 characters."),
  });

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );
      if (res.status === 200) {
        console.log(res.data);
        actions.resetForm();
        toast.success("Admin Login Success!");
        push("/admin/profile");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
    // actions.resetForm();
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your Username",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto py-3">
      <form
        className="my-20 mx-auto flex w-full flex-col items-center md:w-1/2"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Admin Login</Title>
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
          <button className="btn-primary">LOGIN</button>
          <Link href="/">
            <span className="cursor-pointer text-sm text-secondary underline">
              Home Page
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Admin;
