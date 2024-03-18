"use client";
import React from 'react';
import Link from "next/link";
import { useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

function LoginPage() {

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
   
})

const onLogin = async () => {
  try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/");
  } catch (error) {
      console.log("Login failed", error);
  } 
}

  return (
    <div className='flex justify-center items-center m-10 sm:m-12'>
      <div className='border-2 rounded-2xl w-full sm:w-1/2 h-1/2 sm:h-1/3 flex flex-col items-center'>
        <div className='text-3xl font-semibold m-5'>Login</div>
        <div className='text-2xl font-medium m-4'>Welcome back to ECOMMERCE</div>
        <div className='text-base font-normal m-2'>The next gen business marketplace</div>

        <div className='flex flex-col w-5/6 sm:w-4/6 m-4'>
          <label htmlFor="email">Email</label>
          <div>
            <input onChange={(e) => setUser({...user, email: e.target.value})}
             id="email"
              type="text"
               placeholder="Enter"
                className='border border-gray-300 rounded-md h-12 w-full p-4' />
                <div className='p-1 text-sm text-slate-500'>Test Email - medhisambhabya@gmail.com</div>
          </div>
        </div>

        <div className='flex flex-col w-5/6 sm:w-4/6 m-4'>
          <label htmlFor="password">Password</label>
          <div className='flex flex-col'>
            <input onChange={(e) => setUser({...user, password: e.target.value})} 
            id="password" type="password" placeholder="Enter" className='border border-gray-300 rounded-md h-12 w-full p-4' />
          </div>
          <div className='p-1 text-sm text-slate-500'>Test Password - 123456</div>
        </div>

        <button onClick={onLogin}
         className='h-14 rounded-md bg-black w-5/6 sm:w-4/6 text-white m-5'>LOGIN</button>
        <hr className='w-5/6 sm:w-4/6 border-gray-300' style={{ background: "#C1C1C1", height: "1px" }} />
        <Link href="/signup" className='text-base font-medium m-6'>
          <span className='text-base font-normal'>Don&apos;t have an Account?</span> SIGN UP
        </Link>

      </div>
    </div>
  );
}

export default LoginPage;
