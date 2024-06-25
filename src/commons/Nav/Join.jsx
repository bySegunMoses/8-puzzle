import React from "react";
import {Button} from 'react-aria-components';
import { useRouter } from "next/navigation";

export const Join = () => {
    const navigate = useRouter();

    const handleNavigate = (url) => {
        navigate.push(url)
      }

    const tailwindButtonStyle = "hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
    return (
        <div className="md:flex hidden justify-between flex-row space-x-2">
            <Button onPress={() => {handleNavigate('/login')}} className={`${tailwindButtonStyle} bg-gray-700`}>Login</Button>
            <Button onPress={() => {handleNavigate('/signup')}} className={`${tailwindButtonStyle} bg-blue-700`}>SignUp</Button>
        </div>
    )
}