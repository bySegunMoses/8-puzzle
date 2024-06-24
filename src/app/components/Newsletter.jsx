"use client"

import React from 'react';
import { GoHeart } from "react-icons/go";
import { Input, Button } from 'react-aria-components';

const Newsletter = () => {
    const buttonStyle = "hover:bg-primary text-white py-2 px-4 justify-center space-x-4 items-center rounded-xl"
    const inputStyle = "p-2 bg-[#374151] bg-opacity-25 w-[90%] text-white rounded-lg items-center align-center"
    return (
        <div className='px-8 py-10 rounded-xl bg-primary-500 bg-opacity-10 justify-start texxt-white space-y-4'>
            <div className='flex w-12 h-12 justify-center items-center rounded-lg bg-goldYellow bg-opacity-15 text-goldYellow font-bold text-xl'>
                <GoHeart style={{ strokeWidth: 1.5 }}/>
            </div>
            <div className='flex-col space-y-2'>
                <h1 className='text-3xl font-bold'>Subscribe To Our Newsletter</h1>
                <p className='text-md font-light'>Keep in touch with current gaming events, news and game releases.</p>
            </div>

            <Input 
            placeholder='Your.Email@here.com'
            className={`${inputStyle}`}
            />
            <Button className={`${buttonStyle} bg-blue-700 font-medium`}>Subscribe</Button>
        </div>
    )
}

export default Newsletter;