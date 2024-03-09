import { Request, Response } from 'express';
import automobileUtilizationController from './automobileUtilization.controller';
import { prismaMock } from '../mocks/prisma';

describe('Automobile Utilization Controller', () => {
  describe('createAutomobileUtilization', () => {
    it('should create a new automobile utilization', async () => {
      const req = {
        body: {
          automobileId: '1',
          driverId: '2',
          reason: 'Work',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobileUtilization.findFirst.mockResolvedValueOnce(null);

      prismaMock.automobileUtilization.create.mockResolvedValue({
        id: '1',
        automobileId: '1',
        driverId: '2',
        reason: 'Work',
        startDate: new Date(),
        endDate: null,
      });

      await automobileUtilizationController.createAutomobileUtilization(req, res);

      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledTimes(2);
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { driverId: '2', endDate: null },
      });
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { automobileId: '1', endDate: null },
      });

      expect(prismaMock.automobileUtilization.create).toHaveBeenCalledWith({
        data: {
          automobileId: '1',
          driverId: '2',
          reason: 'Work',
          startDate: expect.any(Date),
        },
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should handle error when driver is already using a car', async () => {
      const req = {
        body: {
          automobileId: '1',
          driverId: '2',
          reason: 'Work',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobileUtilization.findFirst.mockResolvedValueOnce({
        id: '1',
        automobileId: '1',
        driverId: '2',
        reason: 'Work',
        startDate: new Date(),
        endDate: null,
      });

      await automobileUtilizationController.createAutomobileUtilization(req, res);

      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { driverId: '2', endDate: null },
      });

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Driver is already using a car' });
    });

    it('should handle error when car is already being used by another driver', async () => {
      const req = {
        body: {
          automobileId: '1',
          driverId: '2',
          reason: 'Work',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobileUtilization.findFirst.mockResolvedValueOnce(null);
      prismaMock.automobileUtilization.findFirst.mockResolvedValueOnce({
        id: '1',
        automobileId: '1',
        driverId: '3',
        reason: 'Work',
        startDate: new Date(),
        endDate: null,
      });

      await automobileUtilizationController.createAutomobileUtilization(req, res);

      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledTimes(2);
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { driverId: '2', endDate: null },
      });
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { automobileId: '1', endDate: null },
      });

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'This car is already being used by another driver' });
    });

    it('should handle error', async () => {
      const req = {
        body: {
          automobileId: '1',
          driverId: '2',
          reason: 'Work',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobileUtilization.findFirst.mockResolvedValueOnce(null);
      prismaMock.automobileUtilization.create.mockRejectedValue(new Error('Database error'));

      await automobileUtilizationController.createAutomobileUtilization(req, res);

      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledTimes(2);
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { driverId: '2', endDate: null },
      });
      expect(prismaMock.automobileUtilization.findFirst).toHaveBeenCalledWith({
        where: { automobileId: '1', endDate: null },
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('finishAutomobileUtilization', () => {
    it('should finish automobile utilization', async () => {
      const endDate = new Date();

      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;


      prismaMock.automobileUtilization.update.mockResolvedValueOnce({
        id: '1',
        automobileId: '1',
        driverId: '2',
        reason: 'Work',
        startDate: new Date(),
        endDate,
      });

      await automobileUtilizationController.finishAutomobileUtilization(req, res);

      expect(prismaMock.automobileUtilization.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { endDate },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    it('should handle error', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobileUtilization.update.mockRejectedValue(new Error('Database error'));

      await automobileUtilizationController.finishAutomobileUtilization(req, res);

      expect(prismaMock.automobileUtilization.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { endDate: expect.any(Date) },
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('listAutomobileUtilizations', () => {
    it('should list automobile utilizations', async () => {
      const req = {} as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const utilizations = [
        {
          id: '1',
          automobileId: '1',
          driverId: '2',
          reason: 'Work',
          startDate: new Date(),
          endDate: new Date(),
          driver: { id: '2', name: 'John Doe' },
          automobile: { id: '1', plate: 'ABC1234', color: 'Red', brand: 'Toyota' },
        }
      ];

      prismaMock.automobileUtilization.findMany.mockResolvedValue(utilizations);

      await automobileUtilizationController.listAutomobileUtilizations(req, res);

      expect(prismaMock.automobileUtilization.findMany).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(utilizations);
    });

    it('should handle error', async () => {
      const req = {} as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobileUtilization.findMany.mockRejectedValue(new Error('Database error'));

      await automobileUtilizationController.listAutomobileUtilizations(req, res);

      expect(prismaMock.automobileUtilization.findMany).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});