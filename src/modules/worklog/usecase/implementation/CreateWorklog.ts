import type { WorklogRepository } from "../../repository/interface/WorklogRepository";
import type { CreateWorklogRequest } from "../../domain/req/CreateWorklogRequest";
import type { WorklogResponse } from "../../domain/res/WorklogResponse";
import type { ICreateWorklog } from "../interface/ICreateWorklog";

export class CreateWorklog implements ICreateWorklog {
    constructor(private repository: WorklogRepository) {}

    async execute(request: CreateWorklogRequest): Promise<WorklogResponse> {
        return this.repository.createWorklog(request);
    }
}