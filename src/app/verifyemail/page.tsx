"use client";
import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface user {
  id: number,
  username: string,
  email: string,
  isVerified: boolean,
}

let currentOTPIndex = 0;
function Page() {

  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(new Array(8).fill([""]));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...(otp as string[])];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);



const onVerify = async ()=>{
    try {
      
        const otp1 = otp.join('');
        
        
        setVerificationError("Processing...");
        const response = await axios.post("/api/users/verifyemail", {o_t_p: otp1});
        console.log("verification successful", response.data);
        setVerificationError("Successfully Verified");
        router.push("/");
    }catch(err){
        console.log("error-",err);
        setVerificationError( "Verification failed. Please try again.");
    } finally{

    }
}


useEffect(()=>{

  const checkVerified = async ()=>{

    try{
    const {data}: { data: { user: user } } = await axios.get("/api/users/isverified");
    
    setEmail(data.user.email.substring(0,5)+'******');
    console.log(data.user);
    if(data.user.isVerified) router.push("/");
    }catch(err){
      console.error('Error fetching user data:', err);
    }
  }
      
checkVerified();

},[])
  

  return (
    <div>
        <div className='flex justify-center items-center m-10 sm:m-12'>
      <div className='border-2 rounded-2xl w-full sm:w-1/2 h-1/2 sm:h-1/3 flex flex-col items-center'>
        <div className='text-3xl font-semibold m-5'>Verify your email</div>
        <div className='text-base font-normal m-2'>Enter the 8 digit code you received on {email}</div>
        {verificationError && (
          <h1 className="text-red-500 text-center font-semibold m-5">{verificationError}</h1>
        )}
        <div className="m-10">
      <div className="mb-2">Code</div>
      <div className={"flex justify-center items-center space-x-2"}>
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={activeOTPIndex === index ? inputRef : null}
              
              className={
                "w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
              }
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
            />
          </React.Fragment>
        );
      })}
      </div>
    </div>
        

        <button onClick={onVerify}
         className='h-14 rounded-md bg-black w-5/6 sm:w-4/6 text-white m-5'>VERIFY</button>
      </div>
    </div>
    </div>
  )
}

export default Page