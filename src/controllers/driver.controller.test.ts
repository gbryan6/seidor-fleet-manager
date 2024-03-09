import { Request, Response } from 'express';
import driverController from './driver.controller';
import { prismaMock } from '../mocks/prisma';

describe('Driver Controller', () => {
  describe('createDriver', () => {
    it('should create a new driver', async () => {
      const req = {
        body: { name: 'John Doe' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const createdDriver = { id: '1', name: 'John Doe' };
      prismaMock.driver.create.mockResolvedValue(createdDriver);

      await driverController.createDriver(req, res);

      expect(prismaMock.driver.create).toHaveBeenCalledWith({
        data: { name: 'John Doe' },
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdDriver);
    });

    it('should handle error', async () => {
      const req = {
        body: { name: 'John Doe' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.create.mockRejectedValue(new Error('Database error'));

      await driverController.createDriver(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateDriver', () => {
    it('should update an existing driver', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'John Doe' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const updatedDriver = { id: '1', name: 'John Doe' };
      prismaMock.driver.update.mockResolvedValue(updatedDriver);

      await driverController.updateDriver(req, res);

      expect(prismaMock.driver.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { name: 'John Doe' },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedDriver);
    });

    it('should handle error', async () => {
      const req = {
        params: { id: '1' },
        body: { name: 'John Doe' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.update.mockRejectedValue(new Error('Database error'));

      await driverController.updateDriver(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteDriver', () => {
    it('should delete an existing driver', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.delete.mockResolvedValue({});

      await driverController.deleteDriver(req, res);

      expect(prismaMock.driver.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle error', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.delete.mockRejectedValue(new Error('Database error'));

      await driverController.deleteDriver(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getDriverById', () => {
    it('should return the driver if found', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const driver = { id: '1', name: 'John Doe' };
      prismaMock.driver.findUnique.mockResolvedValue(driver);

      await driverController.getDriverById(req, res);

      expect(prismaMock.driver.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(driver);
    });

    it('should return 404 if driver is not found', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.findUnique.mockResolvedValue(null);

      await driverController.getDriverById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Driver not found' });
    });

    it('should handle error', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.findUnique.mockRejectedValue(new Error('Database error'));

      await driverController.getDriverById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('listDrivers', () => {
    it('should return list of drivers', async () => {
      const req = {
        query: { name: 'John' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const drivers = [{ id: '1', name: 'John Doe' }];
      prismaMock.driver.findMany.mockResolvedValue(drivers);

      await driverController.listDrivers(req, res);

      expect(prismaMock.driver.findMany).toHaveBeenCalledWith({
        where: { name: { contains: 'John' } },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(drivers);
    });

    it('should handle error', async () => {
      const req = {
        query: { name: 'John' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.driver.findMany.mockRejectedValue(new Error('Database error'));

      await driverController.listDrivers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});