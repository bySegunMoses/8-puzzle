import React, { useState } from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import { Drawer } from 'antd';
import { MdOutlineFastfood } from 'react-icons/md';
import { GiFoodTruck } from 'react-icons/gi';
import { IoLogIn } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaMapMarker, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { navConfig } from './config';

export const NavDrawer = () => {
  const [open, setOpen] = useState(false);
  const { about, playGame, news, contact, login, signup, account } = navConfig.links;
  const router = useRouter();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLinkClick = (route) => {
    router.push(route); // Use useRouter to navigate to the specified route
    handleDrawerClose();
  };

  return (
    <div className="">
      <button className='focus:outline-none' onClick={() => setOpen(true)}>
        <HiMenuAlt2 className="text-white mr-3 md:hidden flex" size={24} />
      </button>
      <Drawer
        title="Guest Account"
        placement={'left'}
        closable={true}
        onClose={handleDrawerClose}
        open={open}
        key={'left'}
        className="bg-blue-700 flex flex-col"
      >
        <div className="flex flex-col justify-between grow ">
          <div className="flex flex-col  mt-10">
            <button
              className="flex hover:no-underline flex-row items-center  mt-5"
              onClick={() => handleLinkClick(login.route)}
            >
              <IoLogIn className="text-blue-700 mr-5" size={24} />
              <p className="font-arial text-lg font-semibold text-gray-700">
                {login.title}
              </p>
            </button>
            <button
              className="flex focus:outline-none flex-row items-center mt-5"
              onClick={() => handleLinkClick(signup.route)}
            >
              <FaUserPlus className="text-blue-700 mr-5" size={24} />
              <p className="font-arial text-lg font-semibold text-gray-700">
                {signup.title}
              </p>
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
