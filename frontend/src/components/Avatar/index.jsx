import React from "react";
import BoaringAvatar from "boring-avatars";

export default function Avatar({ username, size = 40, variant = "beam" }) {
  return (
    <BoaringAvatar
      size={size}
      name={username}
      variant={variant}
      colors={["#6C7C96", "#96BDA8", "#BFD4AD", "#F7D3A3", "#328DE7"]}
    />
  );
}
