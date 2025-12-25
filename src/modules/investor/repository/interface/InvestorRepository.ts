import type { CreateInvestorRequest } from "../../domain/req/CreateInvestorRequest";
import type { UpdateInvestorRequest } from "../../domain/req/UpdateInvestorRequest";
import type { GetInvestorsRequest } from "../../domain/req/GetInvestorsRequest";
import type { GetInvestorByIdRequest } from "../../domain/req/GetInvestorByIdRequest";
import type { InvestorResponse } from "../../domain/res/InvestorResponse";
import type { InvestorListResponse } from "../../domain/res/InvestorListResponse";
import type { PrepareTransactionRequest } from "../../../shared/domain/req/PrepareTransactionRequest";
import type { UpdatePreferredTokenRequest } from "../../../shared/domain/req/UpdatePreferredTokenRequest";
import type { TransactionResponse } from "../../../shared/domain/res/TransactionResponse";

export interface InvestorRepository {
    createInvestor(request: CreateInvestorRequest): Promise<InvestorResponse>;
    getInvestors(request: GetInvestorsRequest): Promise<InvestorListResponse>;
    getInvestorById(request: GetInvestorByIdRequest): Promise<InvestorResponse>;
    updateInvestor(request: UpdateInvestorRequest): Promise<InvestorResponse>;
    deleteInvestor(id: string): Promise<void>;
    prepareDepositLiquidity(request: PrepareTransactionRequest): Promise<TransactionResponse>;
    prepareWithdrawReward(request: PrepareTransactionRequest): Promise<TransactionResponse>;
    updateMePreferredToken(request: UpdatePreferredTokenRequest): Promise<TransactionResponse>;
}