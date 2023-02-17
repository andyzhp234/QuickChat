import React from "react";

export default function ModalInput({
  labelName,
  inputValue,
  inputOnChange,
  inputType,
  isRequired,
  altValue,
}) {
  return (
    <div className="my-5">
      <h1 className="font-medium">{labelName}</h1>
      <input
        className="h-10 w-full rounded-xl border border-slate-400 pl-2"
        type={inputType}
        value={inputValue}
        onChange={inputOnChange}
        required={isRequired}
        alt={altValue}
      />
    </div>
  );
}
