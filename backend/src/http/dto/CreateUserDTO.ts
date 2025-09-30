import { User } from "../../domain/User";

export interface CreateUserDto extends Omit<User, "id" | "age">{
    age: string
}