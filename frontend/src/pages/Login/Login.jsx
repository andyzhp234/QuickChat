import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthBox from "../../components/Auth/AuthBox";
import AuthInput from "../../components/Auth/AuthInput";
import AuthNavText from "../../components/Auth/AuthNavText";
import { userLoginAction } from "../../store/actions/apiUserActions";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6 || password.length > 12) {
      setErrorMessage("Password needs to be length between 6 - 12");
      return;
    }

    const response = await dispatch(userLoginAction(email, password));

    if (response.error) {
      setErrorMessage(response.message);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <AuthBox>
        <h1 className="text-center text-2xl font-semibold">Welcome back!</h1>
        {errorMessage != "" ? (
          <h1 className="p-2 text-center text-sm text-red-700">
            {errorMessage}
          </h1>
        ) : null}
        <form onSubmit={handleSubmit}>
          <AuthInput
            label={"Email"}
            type={"email"}
            value={email}
            change={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            label={"Password"}
            type={"password"}
            value={password}
            change={(e) => setPassword(e.target.value)}
          />
          <button
            className="my-4 w-full rounded-3xl bg-blue-600 py-4 font-medium text-white duration-200 hover:bg-blue-700 lg:py-2"
            type="submit"
            required
          >
            Log in
          </button>
        </form>
        <AuthNavText
          description="Need an account? "
          navText="Register"
          nav={() => navigate("/register")}
        />
      </AuthBox>
    </div>
  );
}
