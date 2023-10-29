import { createBrowserRouter } from 'react-router-dom'

import { Home } from './home'
import { Admin } from './admin'
import { Login } from './login'
import { Networks } from './networks'
import { Private } from '../routes/Private'

import { NotFound } from './notfound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/admin',
        element: <Private><Admin/></Private>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/admin/redessociais',
        element: <Private><Networks/></Private>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;