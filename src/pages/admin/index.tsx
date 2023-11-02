import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { BsTrash } from "react-icons/bs"

import { db } from '../../services/firebaseConnection'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'

interface listaProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string,
}

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [url, setUrl] = useState("");
    const [textColor, setTextColor] = useState("#fafafa");
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
    const [links, setLinks] = useState<listaProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            const lista = [] as listaProps[];
            
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })  

            setLinks(lista)
        })

        return () => {
            unsub();
        }
     
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput === "" || url === "") {
            alert('preencha todos os campos');
            return;
        } 

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: url,
            bg: backgroundColorInput,
            color: textColor,
            created: new Date()
        })
        .then(() => {
            setNameInput('');
            setUrl('');
            console.log("Cadastrado com sucesso")
        })
        .catch((err) => {
            console.log("ERRO AO CADASTRAR NO BANCO", err)
        })
    }

    async function handleDelete(id: string) {
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef)
    }

    return(
        <div className="flex item-center flex-col min-h-screen pb-7 px-2 gap-5">
            <Header/>

            <form className="flex items-center justify-center w-full gap-1 flex-col" onSubmit={handleRegister}>
                <div className="flex justify-center flex-col w-full max-w-3xl px-12 gap-5">
                        <label className="text-sm">
                            Nome do Link
                        </label>
                        <input 
                            type="text" 
                            placeholder="Digite o nome do link..."
                            className="p-2 rounded text-black"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                        
                        <label className="text-sm">
                            Url do Link
                        </label>
                        <input 
                            type="url" 
                            placeholder="Digite a url do link..."
                            className="p-2 rounded  text-black"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                </div>

                <section className="flex my-4 gap-5">
                        <div className="flex gap-4 items-center">
                            <label className="text-sm">
                                Cor do Link
                            </label>

                            <input 
                                type="color" 
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className=" rounded w-9 h-9 border-2"
                            />
                        </div>

                        <div className="flex gap-4 items-center">
                            <label className="text-sm">
                                Fundo do Link
                            </label>

                            <input 
                                type="color" 
                                value={backgroundColorInput}
                                onChange={(e) => setBackgroundColorInput(e.target.value)}
                                className=" rounded w-9 h-9 border-2"
                            />
                        </div>


                </section>
                
              <div className="w-full max-w-2xl flex flex-col gap-10">
                    { nameInput !== '' && (

                            <div className="flex items-center justify-start flex-col mb-7 p-1 w-full max-w-2xl border-gray-100/25 border rounded-md">
                                <label className="font-medium mt-2 text-xl mb-3">
                                    Veja como está ficando
                                </label>
                                <article 
                                    className="flex flex-col w-11/12 items-center justify-between bg-zinc-900 rounded px-1 py-3 break-words"
                                    style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                                >
                                        <p 
                                            className="text-base md:text-lg font-medium "
                                            style={{color: textColor}}
                                        >
                                                {nameInput}
                                        </p>
                                </article>
                            </div>
                        )
                    }
                    <div >
                            <button type="submit" className=" mb-7 bg-blue-700 p-2 w-full rounded-md text-white font-medium gap-4 flex justify-center items-center">
                                    Cadastrar
                            </button>
                    </div>
              </div>
            </form>

            <div className="flex flex-col justify-center items-center">
                <h2 className=" font-bold text-white mb-4 text-2xl">
                    Meus Links  
                </h2>

                {links.map((link) => (
                    <article 
                    key={link.id}
                    className="flex items-center justify-between max-w-2xl w-11/12 py-3 px-2 mb-2 rounded select-none" 
                    style={{backgroundColor: link.bg, padding: 12, display: "flex", alignItems: "center"}}
                >
                    <p
                        style={{color: link.color}}
                    >{link.name}</p>
                    <div>
                        <button
                            className="border border-dashed p-1 rounded bg-black"
                            onClick={() => handleDelete(link.id)}
                        >
                            <BsTrash size={18} color="#fff"/>
                        </button>
                    </div>
                </article>
                ))}
               
            </div>

        </div>
    )
}