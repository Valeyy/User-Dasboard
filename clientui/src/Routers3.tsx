import { Route, Router, Routes, useLocation, Location } from "react-router-dom";
import Navbar from "./app/components/global/navbar";
import HomePage from "./app/components/users/users-page";
import { observer } from "mobx-react-lite";
import { useStore } from "./api/state/stores/store";
import { useEffect } from "react";
import loginPage from "./app/components/auth/login-page";
import NotFoundPage from "./app/components/error/notFound-page";
import registerPage from "./app/components/auth/register-page";

export default observer(function Routers3() {
    const {commonStore, accountStore} = useStore()

    useEffect(() => {
        if (commonStore.token) { 
            accountStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, accountStore])

    //if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

    return (
        <div style={{
            height: '100vh'
        }}>
            <Navbar />
            <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/login' Component={loginPage} />
                <Route path='/register' Component={registerPage} />
                <Route path='/*' Component={NotFoundPage} />
            </Routes>
        </div>
    )
})