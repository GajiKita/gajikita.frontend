export interface IGetEmployeesByCompany {
    execute(companyId: string): Promise<any>; // Using any for now, will be replaced with proper type
}