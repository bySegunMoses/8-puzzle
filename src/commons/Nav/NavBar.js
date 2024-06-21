'use client'

import React, {useState, useEffect} from "react";
import { NavDrawer, NavLogo, NavLinks } from "./";
import {useRouter} from "next/navigation";

const Navbar = () => {
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        if (typeof window !== 'undefined') {
          setLoading(false)
        }
      })
    if(!loading) {
        return(
            <nav className="flex h-16 bg-[#F80000] z-20 shadow-md items-center justify-center fixed top-0 left-0 w-full sticky md:px-20 px-7">

                <div className="container mx-auto flex flex-row items-center justify-between">
                
                    <div className="flex md:hidden ">
                        <NavDrawer />
                    </div>

                    <div className="hidden sm:hidden md:flex ">
                        <NavLogo  />
                    </div>

                    <div className="flex flex-1 justify-around items-center">
                        <NavLinks />
                        <div className="flex md:hidden"><NavLogo  /></div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;