import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Navbar from "./app/components/global/navbar";
import UsersPage from "./app/components/users/users-page";
import LoginPage from "./app/components/auth/login-page";
import { useEffect } from "react";
import { useStore } from "./api/state/stores/store";
import { observer } from "mobx-react-lite";
import RegisterPage from "./app/components/auth/register-page";
import NotFoundPage from "./app/components/error/notFound-page";
import LoadingScreen from "./app/components/global/loading-screen";
import RolesPage from "./app/components/roles/roles-page";
import UserRolesModal from "./app/components/users/modals/old-user-modal";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Navbar />}>
            <Route index element={<UsersPage />} />
            <Route path='/roles' element={<RolesPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/*' element={<NotFoundPage />} />
        </Route>
    )
)

export default observer(function Routers() {
    const {commonStore, accountStore} = useStore()

    useEffect(() => {
        if (commonStore.token) { 
            accountStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, accountStore])

    if (!commonStore.appLoaded) return <LoadingScreen />
    
    return (
        <div style={{
            height: '100vh'
        }}>
            <RouterProvider router={router} />
        </div>
    )
})