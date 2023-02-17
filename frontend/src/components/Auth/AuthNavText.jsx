import React from "react";

const AuthNavText = ({ description, navText, nav }) => {
  return (
    <div>
      <h1 className="mt-2 text-slate-700">
        {description}{" "}
        <span
          className="cursor-pointer text-cyan-500 hover:underline"
          onClick={nav}
        >
          {navText}
        </span>
      </h1>
    </div>
  );
};

export default AuthNavText;
