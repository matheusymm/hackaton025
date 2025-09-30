import { User } from "../domain/User";
import { UserRepository } from "../repository/UserRepository";
import { UserServices } from "./UserServices";

export class UserServicesImpl implements UserServices {
    constructor(private readonly repository: UserRepository){
    }

    async create(user: User): Promise<void> {
        this.repository.create(user)
    }

    async update(user: Partial<User>,userId: string): Promise<boolean> {
        return await this.repository.update(user, userId)
    }
    
    async getByEmail(email: string): Promise<User | null>{
        return await this.repository.getByEmail(email)
    }
}