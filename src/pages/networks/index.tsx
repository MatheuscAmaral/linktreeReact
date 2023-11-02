import { Header } from "../../components/header"

import { FormEvent, useEffect, useState } from 'react'

import { db } from '../../services/firebaseConnection';
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore';

export function Networks() {

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
        function loadlinks() {
            const docRef = doc(db, "social", "link");
            getDoc(docRef)
            .then((snapshot) => {
               if (snapshot.data() !== undefined) {
                    setFacebook(snapshot.data()?.facebook);
                    setInstagram(snapshot.data()?.instagram);
                    setYoutube(snapshot.data()?.youtube);
               }
            })
        }  
        
        loadlinks();
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        
        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(() => {
            console.log("Cadastrado com sucesso");
        })
        .catch((err) => {
            console.log("Erro ao cadastrar", err);
        })
    }

    return(
        <div className="flex flex-col min-h-screen max-w-screen-4xl gap-3">
            <Header/>
            
            <h1 className=" text-white text-2xl font-medium mt-8 mb-4 text-center">Minhas redes sociais</h1>

                <form className=" flex flex-col gap-2 p-1 items-center" onSubmit={handleRegister}>
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

                    <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                    <div className="w-full max-w-2xl flex flex-col gap-10">
                    <input 
                        type="url"
                        placeholder="Digite a url do youtube"
                        className=" w-full max-w-2xl rounded p-2 text-black"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                    />

                    <button 
                        type="submit"
                        className="text-white w-full max-w-2xl p-5 bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"    
                    >
                        Salvar Links
                    </button>
                    </div>
                </form>
        </div>
    )
}