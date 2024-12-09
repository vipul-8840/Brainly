import { ReactElement } from "react";

export interface Buttonprops{
    variant:"primary"|"secondary";
    startIcon?:ReactElement;
    text:string; 
    onClick? :()=>void;
    fullWidth?:boolean;
    loading?:boolean;
    
}
const variantClasses = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}
const defaultStyles="px-4 py-2 rounded-md font-light flex items-center"
export function Button({variant,text,startIcon,onClick,fullWidth,loading}:Buttonprops)
{
   return( <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles +`${fullWidth ? " w-full flex justify-center items-center":""} ${loading? "opacity-45":""} `} disabled={loading}>
       <div className="pr-2">
           {startIcon}
        </div> 
        {text}
    </button>
   )
} 