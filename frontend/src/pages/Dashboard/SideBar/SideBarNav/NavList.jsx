import React from "react";

export default function NavList({ activeIndex, setActiveIndex }) {
  return (
    <div className="relative mt-4 flex w-full rounded-3xl border bg-gray-200">
      <ul className="flex w-full justify-between">
        {["Friends", "Groups", "Requests"].map((item, index) => (
          <li
            className={`z-10 w-full cursor-pointer rounded-3xl py-2 text-center text-sm font-semibold transition duration-200 ease-in-out ${
              activeIndex === index ? "text-blue-600 " : "text-gray-500"
            }`}
            onClick={() => setActiveIndex(index)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <div
        className="absolute inset-0 m-1 w-1/3 origin-left transform rounded-3xl bg-white py-2 transition duration-300 ease-in-out"
        style={{
          transform: `translateX(${activeIndex * 96}%)`,
        }}
      ></div>
    </div>
  );
}
