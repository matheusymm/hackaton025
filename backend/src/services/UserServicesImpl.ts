import { User } from "../domain/User";
import { UserRepository } from "../repository/UserRepository";
import { UserServices } from "./UserServices";
import { CreateUserDto } from "../http/dto/CreateUserDTO";
import { v4 as uuidv4 } from 'uuid';

export class UserServicesImpl implements UserServices {
    constructor(private readonly repository: UserRepository){
    }

    async create(user: CreateUserDto): Promise<void> {
        const id = uuidv4()
        const age = new Date(user.age)
        const userToCreate = {id, age, email: user.email,
            name: user.name,
            password: user.password,
            verfifiedAccount: user.verfifiedAccount
        }
        
        this.repository.create(userToCreate)
    }

    async update(user: Partial<User>,userId: string): Promise<boolean> {
        return await this.repository.update(user, userId)
    }
    
    async getByEmail(email: string): Promise<User | null>{
        return await this.repository.getByEmail(email)
    }
}