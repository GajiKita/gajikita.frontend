export type UpdateWithdrawRequest = {
  id: string;
  status?: string;
  approved_amount?: number;
  notes?: string;
};