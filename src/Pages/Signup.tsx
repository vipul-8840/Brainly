import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate } from "react-router-dom";
export function Signup()
{
     const emailRef = useRef<HTMLInputElement>();
     const passwordRef = useRef<HTMLInputElement>();
     const navigate = useNavigate();
     async function signup() {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      
    
      try {
        const response = await axios.post(BACKEND_URL + "/api/v1/sign-up", {
          email,
          password,
        });
         
          
        alert(response.data.mssg || "Signup successful!");
        navigate("/signin")
      } catch (error: any) {
        
        alert(
          error.response?.data?.mssg|| "An error occurred while signing up."
        );
      }
    }
    return (
      <div className="h-screen w-sreen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
               <Input  reference ={emailRef}placeholder="email"/>
               <Input reference={passwordRef} placeholder="password"/>
               <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true}/>
               </div>
        </div>
        

      </div>
    )
}