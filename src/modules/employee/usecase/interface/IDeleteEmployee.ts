export interface IDeleteEmployee {
    execute(id: string): Promise<void>;
}
