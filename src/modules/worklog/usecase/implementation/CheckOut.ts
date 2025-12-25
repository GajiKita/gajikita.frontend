import type { WorklogRepository } from "../../repository/interface/WorklogRepository";
import type { ICheckOut } from "../interface/ICheckOut";

export class CheckOut implements ICheckOut {
    constructor(private repository: WorklogRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.checkOut(id);
    }
}