import { User } from "../domain/User"

export interface UserServices {
    create:(user: User) => Promise<void>
    update:(user: Partial<User>,userId: string)=>Promise<boolean>
    getByEmail: (email: string) => Promise<User | null>
}