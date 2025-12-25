import type { CompanyRepository } from "../../repository/interface/CompanyRepository";
import type { IDeleteCompany } from "../interface/IDeleteCompany";

export class DeleteCompany implements IDeleteCompany {
    constructor(private repository: CompanyRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteCompany(id);
    }
}
