import AccountStore from "./accountStore";
import CommonStore from "./commonStore";
import { useContext, createContext } from "react";
import UsersStore from "./usersStore";

interface Store {
    commonStore: CommonStore,
    accountStore: AccountStore,
    usersStore: UsersStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    accountStore: new AccountStore(),
    usersStore: new UsersStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}