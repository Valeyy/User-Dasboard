import { makeAutoObservable, runInAction } from "mobx";
import User from "../../interfaces/User";
import UserFormValues from "../../interfaces/UserFormValues";
import { store } from "./store";
import agent from "../agent";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default class AccountStore {
    user: User | null = null
    loadingUser = false

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    }

    get isAdmin() {
        return this.user?.roles.some(x => x === "Admin")
    }

    login = async (creds: UserFormValues, navigate: NavigateFunction) => {
        this.loadingUser = true
        try {
            //HTTP Req. => Check creds on server
            const user = await agent.Account.login(creds)

            //Store the JWT-Token on client
            store.commonStore.setToken(user.token!)

            //Set the user on client
            runInAction(() => this.user = user)

            //Redirect to Home
            navigate('/')

            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    register = async (creds: UserFormValues, navigate: NavigateFunction) => {
        this.loadingUser = true
        try {
            //HTTP Req. => Create user on server
            const user = await agent.Account.register(creds)

            //Store JWT-Token on client
            store.commonStore.setToken(user.token!)

            //Set the user on client
            runInAction(() => this.user = user)

            //Redirect to home
            navigate('/')

            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    logout = async (navigate: NavigateFunction) => {
        this.loadingUser = true
        try {
            //Remove JWT-Token on client
            store.commonStore.setToken(null)

            //Remove user from memory 
            runInAction(() => this.user = null)

            //Redirect to home
            navigate('/')

            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    getUser = async () => {
        try {
            //HTTP Req. => Get current logged in user
            const user = await agent.Account.current()

            //Set user
            runInAction(() => this.user = user)
        } catch (error) {
            console.log(error)
        }
    }

    setLoading = (state: boolean) => {
        this.loadingUser = state
    }
}