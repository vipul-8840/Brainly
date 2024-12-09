
interface InputProps{
     placeholder:string;
     reference?:any
}

export function Input({placeholder,reference}:InputProps)
{
    return (
      <div>
        <input type="text" ref={reference} placeholder={placeholder} className="px-4 py-2 border rounded m-2"  >
        </input>
      </div>
    )
}