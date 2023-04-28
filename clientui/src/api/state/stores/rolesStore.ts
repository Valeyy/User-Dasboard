import { makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";
import { store } from "./store";

export default class RolesStore {
    roles: string[] = []
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    loadRoles = async () => {
        this.loading = true
        try {
            //HTTP Req. => List all roles
            const roles = await agent.Roles.list()

            //Set the roles on client side
            runInAction(() => this.roles = roles)

            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    addUserToRole = async (email: string, role: string) => {
        this.loading = true
        try {
            //HTTP Req. => Add role to user on server
            await agent.Roles.addToUser(email, role)

            //Find the user in the user list
            const userIndex = store.usersStore.users.findIndex(x => x.email === email) 

            //Update the users roles
            runInAction(() => {
                store.usersStore.users[userIndex].roles.push(role)
            })

            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    removeUserFromRole = async (email: string, role: string) => {
        this.loading = true
        try {
            //HTTP Req. => Remove role to user on server
            await agent.Roles.removeFromUser(email, role)

            //Find index of user & role
            const userIndex = store.usersStore.users.findIndex(x => x.email === email)
            const roleIndex = store.usersStore.users[userIndex].roles.findIndex(x => x === role)

            //Remove role of the user on client
            runInAction(() => {
                store.usersStore.users[userIndex].roles.splice(roleIndex, 1)
            })
            
            this.setLoading(false)
        } catch (error) {
            console.log(error)
            this.setLoading(false)
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state
    }
}