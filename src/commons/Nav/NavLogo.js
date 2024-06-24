import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/icon.png";

export const NavLogo = () => {
  return (
    <Link className="navbar-left items-center" href="/">
      <Image
        priority
        src={logo}
        alt="Game Logo"
        className="text-sm sm:text-sm md:text-md text-white"
        style={{ color: "#fff", width: "60px", height: "60px" }}
      />
    </Link>
  );
};
