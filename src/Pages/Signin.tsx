import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin()
{
     const emailRef = useRef<HTMLInputElement>();
     const passwordRef = useRef<HTMLInputElement>();
     const navigate = useNavigate();
    
     async function signin() {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
  
      if (!email || !password)
         {
           alert("Please provide both email and password.");
           return;
         }
  
      try {
        const response = await axios.post(BACKEND_URL + "/api/v1/sign-in", {
          email,
          password,
        });
  
      
        const jwt = response.data.token;
        console.log(jwt);
        localStorage.setItem("token", jwt);
        navigate("/dashboard")

       
      } 
      catch (error: any) {
        const errorMessage =
          error.response?.data?.mssg || "An error occurred during sign-in.";
  
        
        switch (error.response?.status) {
          
          case 401:
            alert(errorMessage);
            break;
          default:
            alert("An unexpected error occurred. Please try again.");
        }
      }
    }
  
    return (
      <div className="h-screen w-sreen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
               <Input  reference={emailRef}placeholder="email"/>
               <Input  reference={ passwordRef } placeholder="password"/>
               <div className="flex justify-center pt-4">
                <Button onClick = {signin} loading={false} variant="primary" text="Signin" fullWidth={true}/>
               </div>
        </div>
        

      </div>
    )
}