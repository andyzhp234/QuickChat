import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function EmojiDropdown({ setMessageText }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  });

  return (
    <div
      className={`absolute right-0 bottom-16 z-20 rounded-lg border bg-white shadow-lg transition duration-200 ease-in-out
      ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <Picker
        data={data}
        onEmojiSelect={(emoji) => setMessageText((prev) => prev + emoji.native)}
      />
    </div>
  );
}
