import React from "react";
import Avatar from "../../../../../components/Avatar";

export default function MessageSentByOthers({ data }) {
  const today = new Date();
  const date = new Date(data.date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let formattedDate;
  if (date.toDateString() === today.toDateString()) {
    formattedDate = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  } else {
    formattedDate = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}, ${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  }

  return (
    <div className="flex justify-start p-3">
      <div>
        <Avatar username={data.author.username} size={50} />
      </div>
      <div className="mr-20 ml-2 flex flex-col justify-start">
        <h1 className="text-lg font-semibold">{data.author.username}</h1>
        <h2 className="w-fit rounded-tr-lg rounded-br-lg rounded-bl-lg bg-slate-100 px-4 py-3 shadow-lg">
          {data.content}
        </h2>
        <h2 className="ml-1 mt-1 text-xs text-gray-400">{formattedDate}</h2>
      </div>
    </div>
  );
}
