import { Social } from "../../components/social"
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa"

export function Home() {
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Matheus Amaral</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-tranform hover:scale-105 transition-all cursor-pointer">
                    <a>
                        <p className="text-base text-black md:text-lg">
                            Acesse meu Instagram
                        </p>
                    </a>
                </section>

                <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-tranform hover:scale-105 transition-all cursor-pointer">
                    <a>
                        <p className="text-base text-black md:text-lg">
                            Acesso meu youtube
                        </p>
                    </a>
                </section>

                <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-tranform hover:scale-105 transition-all cursor-pointer">
                    <a>
                        <p className="text-base text-black md:text-lg">
                            Acesse meu Linkedin
                        </p>
                    </a>
                </section>

                <footer className="flex justify-center gap-3 my-4">

                    <Social url="https://www.linkedin.com/in/matheus-amaral-00762b265/">
                        <FaLinkedin size={35} color="#fff"/>
                    </Social>

                    <Social url="https://www.youtube.com/channel/UCek7dMY4R5qotAa-wXcB_XA">
                        <FaYoutube size={35} color="#fff"/>
                    </Social>
                    
                    <Social url="https://www.instagram.com/uomatheus/">
                        <FaInstagram size={35} color="#fff"/>
                    </Social>
                    
                </footer>
            </main>
        </div>
    )
}

