import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listFarmers, getFarmer, createFarmer, listFarmsByFarmer, createFarm } from './agricultureApi';
import { api } from '../api';

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('Agriculture API', () => {
  const mockApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listFarmers', () => {
    it('should fetch farmers with default pagination', async () => {
      const mockResponse = {
        data: {
          items: [
            { id: '1', name: 'John Doe', doc: '123456789' },
            { id: '2', name: 'Jane Smith', doc: '987654321' },
          ],
          total: 2,
          page: 1,
          pageSize: 20,
        },
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await listFarmers();

      expect(mockApi.get).toHaveBeenCalledWith('/farmers?page=undefined&pageSize=undefined');
      expect(result).toEqual(mockResponse.data);
    });

    it('should fetch farmers with custom pagination', async () => {
      const mockResponse = {
        data: {
          items: [{ id: '1', name: 'John Doe', doc: '123456789' }],
          total: 1,
          page: 2,
          pageSize: 10,
        },
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await listFarmers({ page: 2, pageSize: 10 });

      expect(mockApi.get).toHaveBeenCalledWith('/farmers?page=2&pageSize=10');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockApi.get.mockRejectedValue(error);

      await expect(listFarmers()).rejects.toThrow('API Error');
    });
  });

  describe('getFarmer', () => {
    it('should fetch a single farmer by ID', async () => {
      const mockResponse = {
        data: { id: '1', name: 'John Doe', doc: '123456789' },
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await getFarmer('1');

      expect(mockApi.get).toHaveBeenCalledWith('/farmers/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const error = new Error('Farmer not found');
      mockApi.get.mockRejectedValue(error);

      await expect(getFarmer('999')).rejects.toThrow('Farmer not found');
    });
  });

  describe('createFarmer', () => {
    it('should create a new farmer', async () => {
      const farmerData = { name: 'New Farmer', doc: '123456789' };
      const mockResponse = {
        data: { id: '3', ...farmerData },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await createFarmer(farmerData);

      expect(mockApi.post).toHaveBeenCalledWith('/farmers', farmerData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should create a farmer without document', async () => {
      const farmerData = { name: 'New Farmer' };
      const mockResponse = {
        data: { id: '3', ...farmerData },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await createFarmer(farmerData);

      expect(mockApi.post).toHaveBeenCalledWith('/farmers', farmerData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const error = new Error('Validation failed');
      mockApi.post.mockRejectedValue(error);

      await expect(createFarmer({ name: '' })).rejects.toThrow('Validation failed');
    });
  });

  describe('listFarmsByFarmer', () => {
    it('should fetch farms for a specific farmer', async () => {
      const mockResponse = {
        data: [
          { id: '1', name: 'Farm A', farmerId: '1' },
          { id: '2', name: 'Farm B', farmerId: '1' },
        ],
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await listFarmsByFarmer('1');

      expect(mockApi.get).toHaveBeenCalledWith('/farms', { params: { farmerId: '1' } });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('createFarm', () => {
    it('should create a new farm', async () => {
      const farmData = {
        name: 'New Farm',
        farmerId: '1',
        location: 'Some Location',
      };
      const mockResponse = {
        data: { id: '3', ...farmData },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await createFarm(farmData);

      expect(mockApi.post).toHaveBeenCalledWith('/farms', farmData);
      expect(result).toEqual(mockResponse.data);
    });
  });
});
