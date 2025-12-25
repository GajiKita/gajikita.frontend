import type { CreateWorklogRequest } from "../../domain/req/CreateWorklogRequest";
import type { WorklogResponse } from "../../domain/res/WorklogResponse";

export interface ICreateWorklog {
    execute(request: CreateWorklogRequest): Promise<WorklogResponse>;
}