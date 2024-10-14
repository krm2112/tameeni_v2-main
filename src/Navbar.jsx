import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  if (
    window.location.pathname === "/stc" ||
    window.location.pathname === "/navaz"
  )
    return <div></div>;
  return (
    <div
      className={`w-full  flex justify-between px-4 py-1 items-center  ${
        isSticky ? "fixed top-0 z-40 bg-white  md:w-1/3 " : ""
      }`}
    >
      <img
        src="/burger.webp"
        alt="burger"
        onClick={() => (window.location.href = "/")}
        className=" w-6 pt-3"
      />
      <img
        src="/logo.svg"
        alt="logo"
        onClick={() => (window.location.href = "/")}
        className=" w-20 pt-3"
      />
    </div>
  );
};

export default Navbar;
