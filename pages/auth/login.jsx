import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import * as Yup from "yup";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import axios from "axios";

const Login = ({ user }) => {
  const { data: session } = useSession();
  const [current, setCurrent] = useState();
  const { push } = useRouter();
  const loginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
        "Password must contain at least one uppercase, one lowercase, one number and one special character."
      ),
  });

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try {
      const res = await signIn("credentials", options);
      actions.resetForm();
      if (res.status === 200) {
        toast.success("You have successfully logged in.");
        // push("/profile/6317cd1273654e130f7d5f91");
      }
    } catch (err) {
      toast.error(err.res.data.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrent(
          res.data?.find((user) => user.email === session?.user?.email)
        );
        push("/profile/" + current?._id);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [session, push,current]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
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
    <div className="container mx-auto">
      <form
        className="my-20 mx-auto flex w-full flex-col items-center md:w-1/2"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Login</Title>
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
          <button className="btn-primary" type="submit">
            LOGIN
          </button>
          <button
            className="btn-primary !bg-secondary"
            type="button"
            onClick={() => signIn("github")}
          >
            <i className="fa fa-github mr-2 text-lg"></i>
            GITHUB
          </button>
          <Link href="/auth/register">
            <span className="cursor-pointer text-sm text-secondary underline">
              Do you no have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user ? user : null,
    },
  };
}

export default Login;
