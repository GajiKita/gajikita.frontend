export interface ICheckOut {
    execute(id: string): Promise<void>;
}
