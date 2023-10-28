import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export function Header() {
    const navigate = useNavigate();

     async function handleLogout() {
        await signOut(auth);
        navigate("/login")
    }
    
    return(
        <div className='flex justify-center'>
            <header className='w-full max-w-2xl mt-4 px-1 flex'>
                <nav className='flex w-full bg-slate-400 h-12 items-center justify-between p-5 rounded-md'>
                    <div className='text-black flex gap-4'>
                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/admin">
                            Links
                        </Link>

                        <Link to="/admin/redessociais">
                            Redes sociais
                        </Link>
                    </div>

                    <button onClick={handleLogout}>
                        <BiLogOut color="black"/>
                    </button>
                </nav>
            </header>

        </div>
    )
}