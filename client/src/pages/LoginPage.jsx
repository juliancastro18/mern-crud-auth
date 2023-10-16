import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import FormButton from '../components/FormButton';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, error: signinError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        { signinError && <div className="bg-red-500 p-2 text-white">{signinError.message}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type={"email"}
            register={register("email", { required: true })}
            placeholder={"Email"}
            errors={errors.email}
          />
          <FormInput
            type={"password"}
            register={register("password", { required: true })}
            placeholder={"Password"}
            errors={errors.password}
          />
          <FormButton type="submit" color="blue" className="my-2 mt-6" >Login</FormButton>
        </form>

        <p className="flex gap-x-2 justify-between">
          Don't have an account?
          <Link className="text-sky-500" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
