"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

function Page() {

  const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "", 
        
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          router.push("/verifyemail");
          
      } catch (error) {
          console.log("Signup faileddd", error);
          
          
      }finally {
          setLoading(false);
      }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);

  return (
    <div className='flex justify-center items-center m-10 sm:m-12'>
      <div className='border-2 rounded-2xl w-full sm:w-1/2 h-1/2 sm:h-1/3 flex flex-col items-center'>
        <div className='text-3xl font-semibold m-5'>Create your account</div>

        <div className='flex flex-col w-5/6 sm:w-4/6 m-4'>
          <label htmlFor="name">Name</label>
          <div className='flex flex-col'>
            <input onChange={(e) => setUser({...user, username: e.target.value})}
             id="name" type="text" placeholder="Enter" className='border border-gray-300 rounded-md h-12 w-full p-4' />
          </div>
        </div>

        <div className='flex flex-col w-5/6 sm:w-4/6 m-4'>
          <label htmlFor="email">Email</label>
          <div>
            <input onChange={(e) => setUser({...user, email: e.target.value})}
            id="email" type="text" placeholder="Enter" className='border border-gray-300 rounded-md h-12 w-full p-4' />
          </div>
        </div>

        <div className='flex flex-col w-5/6 sm:w-4/6 m-4'>
          <label htmlFor="password">Password</label>
          <div className='flex flex-col'>
            <input onChange={(e) => setUser({...user, password: e.target.value})}
            id="password" type="password" placeholder="Enter" className='border border-gray-300 rounded-md h-12 w-full p-4' />
          </div>
        </div>

        {!buttonDisabled && <button onClick={onSignup} className='h-14 rounded-md bg-black w-5/6 sm:w-4/6 text-white m-5'>CREATE ACCOUNT</button>}
        <h1>{loading ? "Processing" : ""}</h1>
        <Link href="/login" className='text-base font-medium m-6 mb-10'><span className='text-base font-normal'>Have an Account?</span> LOG IN</Link>
      </div>
    </div>
  );
}

export default Page;
