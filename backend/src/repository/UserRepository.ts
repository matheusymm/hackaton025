import { User } from "../domain/User";

export interface UserRepository {
    create:(user: User) => Promise<User>
    update:(user: Partial<User>,userId: string)=>Promise<boolean>
    getByEmail: (email: string) => Promise<User | null>
}