import { Request } from "express";
import { UserServices } from "../../../services/UserServices";
import { HttpController, HttpRequest, HttpResponse, HttpStatusEnum } from "../..";
import { z } from 'zod';
import { InvalidFieldError } from "../../../domain/errors";

export class CreateUserController implements HttpController {
    constructor(private service: UserServices){}

    async handle(req: HttpRequest): Promise<HttpResponse<any>>{
        // Zod schema for the request body
        const userSchema = z.object({
        email: z.email(),
        name: z.string(),
        age: z.string(),
        password: z.string().min(6), // adjust min length as needed
        verfifiedAccount: z.boolean(),
        });

        const parsed = userSchema.safeParse(req.body);
        if (!parsed.success) {
            const firstIssue = parsed.error.issues[0];
            const fieldName = firstIssue.path.join('.');
            const errorMessage = `${fieldName}: ${firstIssue.message}`;

            //console.log(errorMessage);
            throw new InvalidFieldError('Invalid field', errorMessage);
        }
        await this.service.create(parsed.data)
        return { status: HttpStatusEnum.Created}
    }
}