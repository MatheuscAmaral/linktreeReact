import { Social } from "../../components/social"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { useEffect, useState } from "react"
import { db } from "../../services/firebaseConnection"
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc

} from 'firebase/firestore'

interface linkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string,
}

interface socialProps {
    facebook: string,
    instagram: string,
    youtube: string
}


export function Home() {
    const [links, setLinks] = useState<linkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<socialProps>();


    useEffect(() => {
        function load() {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        getDocs(queryRef)
        .then((snapshot) => {
            const lista = [] as linkProps[];

            snapshot.forEach((doc) => {
                lista.push ({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLinks(lista);
        })
        }

        load()
    }, [])

    useEffect(() => {
       function loadsocial() {
        const docRef = doc(db, "social", "links");
        getDoc(docRef)
        .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                    })
                }
        }) 
       }

       loadsocial();
    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Matheus Amaral</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {
                    links.map((item) => (
                        <section 
                            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-tranform hover:scale-105 transition-all cursor-pointer"
                            key={item.id}
                            style={{backgroundColor: item.bg}}
                            id="link"
                        >
                            <a href={item.url} target="_blank">
                                <p 
                                    className="text-base  md:text-lg"
                                    style={{color: item.color}}
                                >
                                   {item.name}
                                </p>
                            </a>
                        </section>
                    ))
                }

            {
                socialLinks && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook size={35} color="#fff"/>
                        </Social>

                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={35} color="#fff"/>
                        </Social>
                        
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#fff"/>
                        </Social>
                        
                    </footer>
                )
            }
            </main>
        </div>
    )
}

