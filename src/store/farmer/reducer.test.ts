import { describe, it, expect } from 'vitest';
import { farmersReducer, type FarmersState } from './reducer';
import * as A from './action';

describe('Farmers Reducer', () => {
  const initialState: FarmersState = {
    items: [],
    total: 0,
    page: 1,
    pageSize: 20,
    loading: false,
    error: undefined,
    current: null,
    getting: false,
    creating: false,
    updating: false,
    deleting: {},
  };

  it('should return initial state', () => {
    expect(farmersReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  describe('FARMERS_LIST_REQ', () => {
    it('should set loading to true and update pagination', () => {
      const action = {
        type: A.FARMERS_LIST_REQ,
        payload: { page: 2, pageSize: 10 }
      };
      
      const newState = farmersReducer(initialState, action);
      
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeUndefined();
      expect(newState.page).toBe(2);
      expect(newState.pageSize).toBe(10);
    });
  });

  describe('FARMERS_LIST_OK', () => {
    it('should update items and set loading to false', () => {
      const mockItems = [
        { id: '1', name: 'John Doe', doc: '123456789' },
        { id: '2', name: 'Jane Smith', doc: '987654321' },
      ];
      
      const action = {
        type: A.FARMERS_LIST_OK,
        payload: {
          items: mockItems,
          total: 2,
          page: 1,
          pageSize: 20
        }
      };
      
      const newState = farmersReducer(initialState, action);
      
      expect(newState.loading).toBe(false);
      expect(newState.items).toEqual(mockItems);
      expect(newState.total).toBe(2);
      expect(newState.page).toBe(1);
      expect(newState.pageSize).toBe(20);
    });
  });

  describe('FARMERS_LIST_ERR', () => {
    it('should set error and set loading to false', () => {
      const action = {
        type: A.FARMERS_LIST_ERR,
        payload: 'Failed to fetch farmers'
      };
      
      const newState = farmersReducer(initialState, action);
      
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Failed to fetch farmers');
    });
  });

  describe('FARMERS_CREATE_REQ', () => {
    it('should set creating to true', () => {
      const action = {
        type: A.FARMERS_CREATE_REQ,
        payload: { name: 'New Farmer', doc: '123456789' }
      };
      
      const newState = farmersReducer(initialState, action);
      
      expect(newState.creating).toBe(true);
      expect(newState.error).toBeUndefined();
    });
  });

  describe('FARMERS_CREATE_OK', () => {
    it('should add new farmer to items and set creating to false', () => {
      const existingItems = [
        { id: '1', name: 'John Doe', doc: '123456789' }
      ];
      
      const stateWithItems = {
        ...initialState,
        items: existingItems,
        total: 1
      };
      
      const newFarmer = { id: '2', name: 'Jane Smith', doc: '987654321' };
      
      const action = {
        type: A.FARMERS_CREATE_OK,
        payload: newFarmer
      };
      
      const newState = farmersReducer(stateWithItems, action);
      
      expect(newState.creating).toBe(false);
      expect(newState.items).toHaveLength(2);
      expect(newState.items[0]).toEqual(newFarmer);
      expect(newState.total).toBe(2);
    });
  });

  describe('FARMERS_CREATE_ERR', () => {
    it('should set error and set creating to false', () => {
      const action = {
        type: A.FARMERS_CREATE_ERR,
        payload: 'Failed to create farmer'
      };
      
      const newState = farmersReducer(initialState, action);
      
      expect(newState.creating).toBe(false);
      expect(newState.error).toBe('Failed to create farmer');
    });
  });

  describe('FARMERS_DELETE_REQ', () => {
    it('should set deleting state for specific farmer', () => {
      const action = {
        type: A.FARMERS_DELETE_REQ,
        payload: { id: '1' }
      };
      
      const newState = farmersReducer(initialState, action);
      
      expect(newState.deleting['1']).toBe(true);
    });
  });

  describe('FARMERS_DELETE_OK', () => {
    it('should remove farmer from items and update deleting state', () => {
      const existingItems = [
        { id: '1', name: 'John Doe', doc: '123456789' },
        { id: '2', name: 'Jane Smith', doc: '987654321' },
      ];
      
      const stateWithItems = {
        ...initialState,
        items: existingItems,
        total: 2,
        deleting: { '1': true }
      };
      
      const action = {
        type: A.FARMERS_DELETE_OK,
        payload: { id: '1' }
      };
      
      const newState = farmersReducer(stateWithItems, action);
      
      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].id).toBe('2');
      expect(newState.total).toBe(1);
      expect(newState.deleting['1']).toBeUndefined();
    });
  });
});
