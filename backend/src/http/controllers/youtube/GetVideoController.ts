import {
  HttpController,
  HttpRequest,
  HttpResponse,
  HttpStatusEnum,
} from "../..";
import { z } from "zod";
import { InvalidFieldError } from "../../../domain/errors";
import { AccessPyApi } from "../../../infra/pyapi/AccessPyApi";
import { getVideosIdsByQuery } from "../../../infra/youtube/getVideosIdsQuery";

export class GetVideosController implements HttpController {
  async handle(req: HttpRequest): Promise<HttpResponse<any>> {
    const querySchema = z.object({
      query: z.string().min(1, "Query não pode ser vazia"),
      duration: z.enum(["short", "medium", "long"]).optional(),
      type: z.string()
    });

    const parsed = querySchema.safeParse(req.body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const fieldName = firstIssue.path.join(".");
      const errorMessage = `${fieldName}: ${firstIssue.message}`;
      throw new InvalidFieldError("Invalid field", errorMessage);
    }

    const { query, type } = parsed.data;
    const pyapi = new AccessPyApi()
    const queryToSearch = await pyapi.getQuery(query,type);
    const videoIds = await getVideosIdsByQuery(queryToSearch, "short");

    return {
      status: HttpStatusEnum.Ok,
      data: { videoIds },
    };
  }
}
