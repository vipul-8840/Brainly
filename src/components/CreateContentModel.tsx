import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./icons/CrossIcon";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../components/config";;

enum ContnetType {
    Youtube ="Youtube",
    Twitter = "Twitter"
}


export function CreateContentModel({open,onClose})
{
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type,setType]=useState(ContnetType.Youtube)

   async function addContent()
   {
    console.log("content is processing")
   const title =titleRef.current?.value
   const link = linkRef.current?.value
   if ( !link)
    {
      alert("link is required");
      return;
    }

       
        try {
            // Make the POST request
            console.log("content going to database")
            await axios.post(
               BACKEND_URL + "/api/v1/content",
                {
                    title,
                    link,
                    type, 
                },
                {
                    headers: {
                        "token": localStorage.getItem("token") 
                    }
                }
            );
    
           alert("content added");
            onClose();
        } catch (error: any) 
        {
            if (error.response) 
            {
                
                const { mssg } = error.response.data;
                if (Array.isArray(mssg)) {
                    
                    alert(mssg.join(", "));
                } 
                else {
                   
                    alert(mssg);
                }
            } 
            
            else {
                // Handle unexpected errors
                console.error("Unexpected Error:", error);
                alert("An unexpected error occurred.");
            }
        } 
   }


   return(
    <div>
      {
        open && <div>
                 <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                </div> 
               <div  className="w-screen h-screen fixed top-0 left-0 flex    justify-center">
                    <div className="flex flex-col justify-center">
                        <span className="bg-white opacity-100 p-4 rounded" >
                            <div className="flex justify-end">
                                <div onClick={onClose} className="cursor-pointer"> <CrossIcon/>
                                </div>
                            
                            </div>
                            <div>
                                <Input reference={titleRef} placeholder={"Title"} />
                                <Input  reference={linkRef}  placeholder={"Link"} />
                                <div className="flex gap-1  justify-center pb-2">
                                    <Button text="Youtube" variant={type===ContnetType.Youtube?"primary":"secondary"} onClick={()=>{
                                            setType(ContnetType.Youtube)
                                        }}/>
                                        <Button text="Twitter" variant={type===ContnetType.Twitter?"primary":"secondary"} onClick={()=>{
                                            setType(ContnetType.Twitter)
                                        }}/>

                                </div>

                                <div className="flex justify-center">
                                    <Button onClick={addContent} variant="primary" text="submit"/> 
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
        </div>
      }


    </div>
     )
}
