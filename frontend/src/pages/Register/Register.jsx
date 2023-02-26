import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthBox from "../../components/Auth/AuthBox";
import AuthInput from "../../components/Auth/AuthInput";
import AuthNavText from "../../components/Auth/AuthNavText";
import { userRegisterAction } from "../../store/actions/apiUserActions";
import PolicyNav from "../../components/PolicyNav";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(
    "This is a demo website. Feel free to use a fake email address."
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6 || password.length > 12) {
      setErrorMessage(
        "The required length for a password is between 6 and 12 characters."
      );
      return;
    }

    if (username.length < 3 || username.length > 12) {
      setErrorMessage(
        "The required length for an username is between 3 and 12 characters."
      );
      return;
    }

    const response = await dispatch(
      userRegisterAction(email, username, password)
    );

    if (response.error) {
      setErrorMessage(response.message);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <AuthBox>
        <h1 className="text-center text-2xl font-medium">Create an account</h1>
        <h1 className="p-3 text-center text-sm text-red-700">{errorMessage}</h1>
        <form onSubmit={handleSubmit}>
          <AuthInput
            id="username"
            label="Username"
            type="text"
            value={username}
            change={(e) => setUsername(e.target.value)}
          />
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            change={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            id="password"
            label="Password"
            type="password"
            value={password}
            change={(e) => setPassword(e.target.value)}
          />
          <button
            className="my-3 w-full rounded-3xl bg-green-500 py-3 text-sm font-bold text-white duration-200 hover:bg-green-600 lg:py-2"
            type="submit"
          >
            Create
          </button>
        </form>
        <AuthNavText
          description=""
          navText="Already Have an Account?"
          nav={() => navigate("/login")}
        />
        <PolicyNav />
      </AuthBox>
    </div>
  );
}
