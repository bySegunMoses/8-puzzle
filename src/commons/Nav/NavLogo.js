import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/game-max.png";

export const NavLogo = () => {
  return (
    <Link className="navbar-left items-center" href="/">
      <Image
        priority
        src={logo}
        alt="Game Logo"
        className="text-sm sm:text-sm md:text-md text-white"
        style={{ color: "#fff", width: "97.2px", height: "48px" }}
      />
    </Link>
  );
};
