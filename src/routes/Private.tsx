import { ReactNode, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {
    const navigate = useNavigate();

   useEffect(() => {
         const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@reactlinks", JSON.stringify(userData));
                
            }
            
            else {
                alert('Você precisa estar logado para acessar está página');
                navigate("/Login")
            }
            
            unsub()
        })
    }, [navigate])
    return children;
}

