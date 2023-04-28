import { makeAutoObservable, runInAction } from "mobx";
import User from "../../interfaces/User";
import agent from "../agent";

export default class UsersStore {
    users: User[] = []
    loading = false
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    loadUsers = async () => {
        this.loadingInitial = true
        try {
            //HTTP Req. => List all users
            const users = await agent.Users.list()

            //Set the users on client side
            runInAction(() => this.users = users)

            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }
}