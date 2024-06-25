"use client"

import React from "react";
import LoginForm from "./components/LoginForm";


const Login = () => {

    return (
        <div className="signin flex min-h-[100vh] justify-center items-center bg-[#fff] py-10 md:px-20 lg:px-30 xl:px-50 2xl:px-60 px-7">
            <LoginForm />
        </div>
    );
}

export default Login;