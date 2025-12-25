export interface IDeleteInvestor {
    execute(id: string): Promise<void>;
}