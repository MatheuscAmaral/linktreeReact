import { Link, useNavigate} from "react-router-dom"
import { Input } from "../../components/Input/index"
import { FormEvent, useState } from "react"
import { auth } from '../../services/firebaseConnection'

import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        if(email === '' || password === ' ') {
            alert("Preencha todos os dados");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log('Sucesso');
            navigate("/admin");
        })
        .catch(() => {
            setResult('Usuário ou senha incorretos!');
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
           <Link to='/'>
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev 
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
                        Link
                    </span>
                </h1>
           </Link>
           <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col justify-center">
                <Input
                    placeholder="Digite o seu e-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Digite a sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium" 
                    type="submit" 
                >
                    Acessar
                </button>
                {
                    result && email != 'matheuscamposdoamaral15@gmail.com' && ((
                        <div className="w-full max-w-xl flex flex-col justify-center bg-red-600 my-3 p-2 h-20 rounded text-center">
                            {result}
                        </div>
                    ))
                }
           </form>

        </div>
    )
}