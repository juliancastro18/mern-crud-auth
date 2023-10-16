import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, error: registerError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    signup(data);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">

        <h1 className="text-2xl font-bold mb-6">Register</h1>
        { registerError && <div className="bg-red-500 p-2 text-white">{registerError.message}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type={"text"}
            register={register("username", { required: true })}
            placeholder={"Username"}
            errors={errors.username}
          />
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
          <FormButton color="blue" className="my-2 mt-6" type="submit">Register</FormButton>
        </form>

        <p className="flex gap-x-2 justify-between">
          Already have an account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
