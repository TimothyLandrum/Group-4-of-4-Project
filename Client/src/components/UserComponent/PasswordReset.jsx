import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PasswordReset() {
    let [token,setToken]=useState("");
    let[Email,setEmail]=useState("");
    let[OTP,setOTP]=useState("");
    let[password,setPassword]=useState("");
    let[emailPhase,setEmailPhase]=useState(true);
    let[otpPhase,setOtpPhase]=useState(false);
    let[passwordPhase,setPasswordPhase]=useState(false);
    let[tooShort,setTooShort]=useState(false);
    let navigate=useNavigate();
    let API_Link=import.meta.env.VITE_API_LINK;
    let[otpError,setOtpError]=useState(false)

    let sendEmail=async()=>{
        setOtpError(true)
        try {
            let response= await fetch (API_Link+"users/otpgen",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email,
                }),
            });
            let result= await response.json();
            if(result.message=="Email sent"){
                setOtpPhase(true);
                setEmailPhase(false);
                setOtpError(false)
            }
            else{
                //do nothing
            }
        } catch (error) {
            console.error(error)
        }
    }

    let sendOTP=async()=>{
        try {
            let response= await fetch (API_Link+"users/otpverify",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    OTP,
                    Email
                }),
            });
            let result= await response.json();
            if(result.token){
                setToken(result.token);
                setOtpPhase(false);
                setEmailPhase(false);
                setPasswordPhase(true);
            }
        } catch (error) {
            console.error(error)
        }
    }

    let sendPassword=async()=>{
        if(password.length<4){
            setTooShort(true);
            return(null);
        }
        try {
            let response= await fetch (API_Link+"users/reset/password",{
                method: "put",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`     //provide the token 
                },
                body: JSON.stringify({
                    password
                }),
            });
            let result= await response.json();

            if(result.Email==Email){
                alert("Password reset complete. You will now be redirected to the login page.")
                navigate("/login",{replace:true});
            }
        } catch (error) {
            console.error(error)
        }
    }

   

  return (
    <div className='password_reset' >
        <h1>Reset Password</h1>
        {emailPhase && 
        <div>
            <p>Enter the email associated with your account</p>
            <label>Email: <input value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" /></label>
            <button className="btn" onClick={()=>sendEmail()}>Submit</button>
            {otpError && <p>Email does not exist in our record!</p>}
        </div>}
        {otpPhase && 
        <div>
            <p>Enter OTP that was sent to your email({Email})</p>
            <label>OTP: <input value={OTP} onChange={(e)=>setOTP(e.target.value)} type="string" /></label>
            <button className="btn" onClick={()=>sendOTP()}>Submit</button>
        </div>}
        {passwordPhase && 
        <div>
            <p>Enter new password({Email})</p>
            <label>Password: <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" /></label>
            <button className="btn" onClick={()=>sendPassword()}>Submit</button>
            {tooShort && <p>Password too short!</p>}
        </div>}
        
    </div>
  )
}

export default PasswordReset