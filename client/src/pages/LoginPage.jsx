import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import MainForm from "../components/MainForm";

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
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <MainForm title="Login">
      {signinError && (
        <div className="bg-red-500 p-2 mb-4 text-white">{signinError.message}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type={"email"}
          register={register("email", { required: true })}
          errors={errors.email}
          className="mb-4"
          autofocus="true"
        />
        <FormInput
          type={"password"}
          register={register("password", { required: true })}
          errors={errors.password}
          className="mb-4"
        />
        <FormButton type="submit" className="my-4">
          Submit
        </FormButton>
      </form>

      <p className="flex gap-x-2 justify-between">
        Don't have an account?
        <Link className="text-sky-400" to="/register">
          Sign up
        </Link>
      </p>
    </MainForm>
  );
}

export default LoginPage;
