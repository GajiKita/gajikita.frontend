import { ExecuteWithdraw } from '../../implementation/ExecuteWithdraw';
import type { WithdrawRepository } from '../../repository/interface/WithdrawRepository';

// Mock repository
const mockWithdrawRepository: jest.Mocked<WithdrawRepository> = {
  createWithdrawRequest: jest.fn(),
  getWithdrawRequests: jest.fn(),
  getWithdrawRequestById: jest.fn(),
  updateWithdrawRequest: jest.fn(),
  deleteWithdrawRequest: jest.fn(),
  simulateWithdraw: jest.fn(),
  executeWithdraw: jest.fn(),
};

describe('ExecuteWithdraw Usecase Tests', () => {
  it('should call repository with correct parameters', async () => {
    const usecase = new ExecuteWithdraw(mockWithdrawRepository);
    const mockId = 'withdraw-123';
    const mockRequest = {
      approved_amount: 1000,
      extra_aave_fee: 50,
    };
    const mockResponse = {
      success: true,
      message: 'Withdrawal executed successfully',
    };

    mockWithdrawRepository.executeWithdraw.mockResolvedValue(mockResponse);

    const result = await usecase.execute(mockId, mockRequest);

    expect(mockWithdrawRepository.executeWithdraw).toHaveBeenCalledWith(
      mockId,
      mockRequest.approved_amount,
      mockRequest.extra_aave_fee
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle repository error', async () => {
    const usecase = new ExecuteWithdraw(mockWithdrawRepository);
    const mockId = 'withdraw-123';
    const mockRequest = {
      approved_amount: 1000,
      extra_aave_fee: 50,
    };
    const mockError = new Error('Repository error');

    mockWithdrawRepository.executeWithdraw.mockRejectedValue(mockError);

    await expect(usecase.execute(mockId, mockRequest)).rejects.toThrow(mockError);
  });

  it('should call repository with undefined extra fee when not provided', async () => {
    const usecase = new ExecuteWithdraw(mockWithdrawRepository);
    const mockId = 'withdraw-123';
    const mockRequest = {
      approved_amount: 1000,
    };
    const mockResponse = {
      success: true,
      message: 'Withdrawal executed successfully',
    };

    mockWithdrawRepository.executeWithdraw.mockResolvedValue(mockResponse);

    const result = await usecase.execute(mockId, mockRequest);

    expect(mockWithdrawRepository.executeWithdraw).toHaveBeenCalledWith(
      mockId,
      mockRequest.approved_amount,
      undefined
    );
    expect(result).toEqual(mockResponse);
  });
});