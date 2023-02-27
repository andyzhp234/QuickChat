import React from "react";

export default function AuthInput({ label, type, value, change, id }) {
  return (
    <div className="w-full py-2">
      <label className="py-2 text-sm font-medium text-black" htmlFor={id}>
        {label}
      </label>
      <input
        className="h-12 w-full rounded-2xl border-2 border-gray-200 pl-2 lg:h-10"
        type={type}
        value={value}
        onChange={change}
        id={id}
        name={id}
        required
      />
    </div>
  );
}
