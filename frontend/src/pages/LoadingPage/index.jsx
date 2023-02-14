import React from "react";

export default function LoadingPage() {
  const [dots, setDots] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center text-4xl font-medium ">
      Redirecting
      {Array.from({ length: dots }, () => ".").join("")}
    </div>
  );
}
