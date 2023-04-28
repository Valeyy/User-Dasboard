export default interface User{
    email: string
    roles: string[]
    token?: string
    signedUp: Date
}