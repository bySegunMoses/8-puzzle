// Navbar.js
import React, { useState, useEffect } from 'react';
import { NavDrawer, NavLogo, NavLinks, Join } from './';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa'; // Account icon

const Navbar = () => {
    const navigate = useRouter();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log("user:", user)
    console.log("isAuth", user.isAuthenticated)

    useEffect(() => {
        if (typeof window !== 'undefined') {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        setIsAuthenticated(user.isAuthenticated);
    })
    const handleNavigate = (url) => {
        navigate.push(url)
      }

    if (!loading) {
        return (
        <nav className="flex h-16 bg-primary z-20 shadow-md items-center justify-center fixed top-0 left-0 w-full sticky py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7">
            <div className="container mx-auto flex flex-row items-center justify-between">
            <div className="flex md:hidden">
                <NavDrawer />
            </div>

            <div className="hidden sm:hidden md:flex">
                <NavLogo />
            </div>

            <div className="flex flex-1 justify-around items-center">
                <NavLinks />
                <div className="flex md:hidden">
                <NavLogo />
                </div>
            </div>

            <div>
                {isAuthenticated ? (
                <div onClick={() => {handleNavigate('/account')}} className="flex items-center text-xl">
                    <FaUserCircle className="text-white text-2xl mr-4 cursor-pointer" />
                </div>
                ) : (
                <Join />
                )}
            </div>
            </div>
        </nav>
        );
    }
    return (
        <nav className="flex h-16 bg-primary z-20 shadow-md items-center justify-center fixed top-0 left-0 w-full sticky py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7">
            <div className="container mx-auto flex flex-row items-center justify-between">
            <div className="flex md:hidden">
                <NavDrawer />
            </div>

            <div className="hidden sm:hidden md:flex">
                <NavLogo />
            </div>

            <div className="flex flex-1 justify-around items-center">
                <NavLinks />
                <div className="flex md:hidden">
                <NavLogo />
                </div>
            </div>

            <div>
                {isAuthenticated ? (
                <div onClick={() => {console.log('create correct path files /account')}} className="flex items-center text-xl">
                    <FaUserCircle className="text-white text-2xl mr-4 cursor-pointer" />
                </div>
                ) : (
                <Join />
                )}
            </div>
            </div>
        </nav>
        );
    };

export default Navbar;
