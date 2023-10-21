import { InputHTMLAttributes } from "react";

interface InputProps  extends InputHTMLAttributes<HTMLInputElement>{}


export function Input(props: InputProps) {
    return(
        <input 
            className="text-black p-2 rounded w-19 boredr-0 h-9 outline-none px-2 mb-3"
            {...props}
        />
    )
}