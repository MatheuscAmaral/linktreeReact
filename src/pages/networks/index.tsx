import { Header } from "../../components/header"
import { Input } from "../../components/Input"
import { useState } from 'react'

export function Networks() {

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");

    return(
        <div className="flex flex-col min-h-screen max-w-screen-4xl gap-3">
            <Header/>
            
            <h1 className=" text-white text-2xl font-medium mt-8 mb-4 text-center">Minhas redes sociais</h1>

                <form className=" flex flex-col gap-2 p-1 items-center">
                    <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                    <input 
                        type="url"
                        placeholder="Digite a url do facebook"
                        className=" w-full max-w-2xl rounded p-2 text-black"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                    />

                    <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                    <input 
                        type="url"
                        placeholder="Digite a url do instagram"
                        className=" w-full max-w-2xl rounded p-2 text-black"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                </form>
        </div>
    )
}