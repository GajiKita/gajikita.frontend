export interface IGetEmployeesByMyCompany {
    execute(): Promise<any>; // Using any for now, will be replaced with proper type
}