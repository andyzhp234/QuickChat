import React from "react";
import Avatar from "../../../../../components/Avatar";

export default function MessageSentByMe({ data }) {
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
    <div className="flex justify-end p-3 text-right">
      <div className="ml-20 mr-2 flex flex-col items-end justify-end">
        <h1 className="text-lg font-semibold">{data.author.username}</h1>
        <h2 className="w-fit rounded-tl-lg rounded-br-lg rounded-bl-lg bg-blue-200 px-4 py-3 text-left shadow-lg">
          {data.content}
        </h2>
        <h2 className="ml-1 mt-1 text-xs text-gray-400">{formattedDate}</h2>
      </div>
      <div>
        <Avatar username={data.author.username} size={50} />
      </div>
    </div>
  );
}
