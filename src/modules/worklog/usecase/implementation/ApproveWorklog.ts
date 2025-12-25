import type { WorklogRepository } from "../../repository/interface/WorklogRepository";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";
import type { IApproveWorklog } from "../interface/IApproveWorklog";

export class ApproveWorklog implements IApproveWorklog {
    constructor(private repository: WorklogRepository) {}

    async execute(id: string): Promise<TransactionResponse> {
        return this.repository.approveWorklog(id);
    }
}
