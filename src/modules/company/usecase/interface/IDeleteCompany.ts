export interface IDeleteCompany {
    execute(id: string): Promise<void>;
}
