import { User } from "../domain/User"
import { CreateUserDto } from "../http/dto/CreateUserDTO"

export interface UserServices {
    create:(user: CreateUserDto) => Promise<void>
    update:(user: Partial<User>,userId: string)=>Promise<boolean>
    getByEmail: (email: string) => Promise<User | null>
}