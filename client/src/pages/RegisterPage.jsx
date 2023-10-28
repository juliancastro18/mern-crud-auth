import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import MainForm from "../components/MainForm";

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
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    signup(data);
  };

  return (
    <MainForm title="Register">
      {registerError && (
        <div className="bg-red-500 p-2 mb-4 text-white">{registerError.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type={"text"}
          register={register("username", { required: true })}
          errors={errors.username}
          className="mb-4"
        />
        <FormInput
          type={"email"}
          register={register("email", { required: true })}
          errors={errors.email}
          className="mb-4"
        />
        <FormInput
          type={"password"}
          register={register("password", { required: true })}
          errors={errors.password}
          className="mb-4"
        />
        <FormButton color="blue" className="my-4" type="submit">
          Register
        </FormButton>
      </form>

      <p className="flex gap-x-2 justify-between">
        Already have an account?
        <Link className="text-sky-500" to="/login">
          Login
        </Link>
      </p>
    </MainForm>
  );
}

export default RegisterPage;
