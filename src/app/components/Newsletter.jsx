"use client"

import React, { useState } from 'react';
import { GoHeart } from "react-icons/go";
import { Input, Button } from 'react-aria-components';
import { db } from '../../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const buttonStyle = "hover:bg-primary text-white py-2 px-4 justify-center space-x-4 items-center rounded-xl";
    const inputStyle = "p-2 bg-[#374151] bg-opacity-25 w-[90%] text-white rounded-lg items-center align-center";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setError("Email is required");
            return;
        }
        try {
            await addDoc(collection(db, "EmailSubscription"), {
                email: email,
                timestamp: new Date() // Optional: to keep track of the subscription time
            });
            setEmail("");
            setError(null);
            alert("Subscribed successfully!");
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Subscription failed. Try again later.");
        }
    };

    return (
        <div className='px-8 py-10 rounded-xl bg-primary-500 bg-opacity-10 justify-start text-white space-y-4'>
            <div className='flex w-12 h-12 justify-center items-center rounded-lg bg-goldYellow bg-opacity-15 text-goldYellow font-bold text-xl'>
                <GoHeart style={{ strokeWidth: 1.5 }}/>
            </div>
            <div className='flex-col space-y-2'>
                <h1 className='text-3xl font-bold'>Subscribe To Our Newsletter</h1>
                <p className='text-md font-light'>Keep in touch with current gaming events, news and game releases.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Input 
                    type="email"
                    placeholder='Your.Email@here.com'
                    className={`${inputStyle}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className={`${buttonStyle} bg-blue-700 font-medium`}>Subscribe</Button>
            </form>
        </div>
    );
};

export default Newsletter;