import { createBrowserRouter } from 'react-router-dom'

import { Home } from './home'
import { Admin } from './admin'
import { Login } from './login'
import { Networks } from './networks'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/admin',
        element: <Admin/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/admin/redessociais',
        element: <Networks/>
    },
])

export default router;