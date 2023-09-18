import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
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
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (
        <div key={i} className="bg-red-500 p-2 text-white">
          {error}
        </div>
      ))}
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
        <button type="submit">Register</button>
      </form>

      <p className="flex gap-x-2 justify-between">
        Already have an account?
        <Link className="text-sky-500" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
