import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./UserRepository";
import { User } from "../domain/User";

export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaClient: PrismaClient){   }
    
    async create(user: User): Promise<void> {
        try {
            await this.prismaClient.user.create({ data: user })
        } catch (error) {
            console.log('There was a error while creating user:\n', error)
        }
    }
    async update(user: Partial<User>,userId: string): Promise<boolean> {
        const isUser = await this.prismaClient.user.update({
            where: { id: userId },
            data: user
        })
        if (!isUser) return false
        return true
    }

    async getByEmail(email: string){
        return await this.prismaClient.user.findUnique({
            where: { email: email },
            include: { UserMetrics: false }
        })
    }
}