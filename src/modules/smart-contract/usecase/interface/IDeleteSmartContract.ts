export interface IDeleteSmartContract {
    execute(id: string): Promise<void>;
}