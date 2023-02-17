import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="mt-2 font-semibold">Oh no! Page not found.</h2>
      </div>
    </div>
  );
}
