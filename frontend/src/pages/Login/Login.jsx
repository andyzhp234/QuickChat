import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthBox from "../../components/Auth/AuthBox";
import AuthInput from "../../components/Auth/AuthInput";
import AuthNavText from "../../components/Auth/AuthNavText";
import HorizontalDivider from "../../components/HorizontalDivider";
import { userLoginAction } from "../../store/actions/apiUserActions";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e, isDemo) {
    e.preventDefault();

    let response;
    if (isDemo) {
      response = await dispatch(userLoginAction("demo@gmail.com", "11111111"));
    } else {
      if (password.length < 6 || password.length > 12) {
        setErrorMessage("Password needs to be length between 6 - 12");
        return;
      }
      response = await dispatch(userLoginAction(email, password));
    }

    if (response.error) {
      setErrorMessage(response.message);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AuthBox>
        <h1 className="text-center text-2xl font-semibold">Welcome back!</h1>
        {errorMessage != "" ? (
          <h1 className="p-2 text-center text-sm text-red-700">
            {errorMessage}
          </h1>
        ) : null}
        <form onSubmit={(e) => handleSubmit(e)}>
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
            className="my-3 w-full rounded-3xl bg-blue-600 py-3 text-sm font-bold text-white duration-200 hover:bg-blue-700 lg:py-2"
            type="submit"
          >
            Log in
          </button>
          <HorizontalDivider text={"OR"} />
          <button
            className="my-3 w-full rounded-3xl border border-black bg-white py-3 text-sm font-semibold duration-200 hover:bg-black hover:text-white lg:py-2"
            type="button"
            onClick={(e) => handleSubmit(e, true)}
          >
            Continue with demo
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
{
  /* <hr class="mr-4 flex-1 border-t-2 border-gray-400" /> */
}
{
  /* <h2 class="font-bold text-gray-600">or</h2> */
}
{
  /* <hr class="ml-4 flex-1 border-t-2 border-gray-400" /> */
}
