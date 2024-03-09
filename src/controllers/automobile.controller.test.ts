import { Request, Response } from 'express';
import automobileController from './automobile.controller';
import { prismaMock } from '../mocks/prisma';

describe('Automobile Controller', () => {

  describe('createAutomobile', () => {
    it('should create a new automobile', async () => {
      const req = {
        body: {
          plate: 'ABC1234',
          color: 'Red',
          brand: 'Toyota',
        },
      } as Request;

      prismaMock.automobile.findUnique.mockResolvedValue(null);

      const createdAutomobile = {
        id: '1',
        plate: 'ABC1234',
        color: 'Red',
        brand: 'Toyota',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.automobile.create.mockResolvedValue(createdAutomobile);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.createAutomobile(req, res);

      expect(prismaMock.automobile.create).toHaveBeenCalledWith({
        data: {
          plate: 'ABC1234',
          color: 'Red',
          brand: 'Toyota',
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdAutomobile);
    });

    it('should handle error when plate already registered', async () => {
      const req = {
        body: {
          plate: 'ABC1234',
          color: 'Red',
          brand: 'Toyota',
        },
      } as Request;

      prismaMock.automobile.findUnique.mockResolvedValue({
        id: '1',
        plate: 'ABC1234',
        color: 'Red',
        brand: 'Toyota',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.createAutomobile(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Plate already registered' });
    });

    it('should handle internal server error', async () => {
      const req = {
        body: {
          plate: 'ABC1234',
          color: 'Red',
          brand: 'Toyota',
        },
      } as Request;

      prismaMock.automobile.findUnique.mockRejectedValueOnce(new Error('Database error'));

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.createAutomobile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error Error: Database error' });
    });
  });

  describe('getAutomobileById', () => {
    it('should return automobile when found', async () => {
      const req = {
        params: { id: '1' },
      }  as unknown as Request;

      const foundAutomobile = {
        id: '1',
        plate: 'ABC1234',
        color: 'Red',
        brand: 'Toyota',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.automobile.findUnique.mockResolvedValue(foundAutomobile);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.getAutomobileById(req, res);

      expect(prismaMock.automobile.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(foundAutomobile);
    });

    it('should handle error when automobile not found', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      prismaMock.automobile.findUnique.mockResolvedValue(null);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.getAutomobileById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Automobile not found' });
    });

    it('should handle internal server error', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      prismaMock.automobile.findUnique.mockRejectedValueOnce(new Error('Database error'));

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.getAutomobileById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateAutomobile', () => {
    it('should update automobile successfully', async () => {
      const req = {
        params: { id: '1' },
        body: {
          plate: 'XYZ5678',
          color: 'Blue',
          brand: 'Honda',
        },
      } as unknown as Request;

      const updatedAutomobile = {
        id: '1',
        plate: 'XYZ5678',
        color: 'Blue',
        brand: 'Honda',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.automobile.findUnique.mockResolvedValue(null);
      prismaMock.automobile.update.mockResolvedValue(updatedAutomobile);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.updateAutomobile(req, res);

      expect(prismaMock.automobile.findUnique).toHaveBeenCalledWith({
        where: { plate: 'XYZ5678' },
      });
      expect(prismaMock.automobile.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          plate: 'XYZ5678',
          color: 'Blue',
          brand: 'Honda',
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedAutomobile);
    });

    it('should handle error when plate is already registered', async () => {
      const req = {
        params: { id: '1' },
        body: {
          plate: 'XYZ5678',
          color: 'Blue',
          brand: 'Honda',
        },
      } as unknown as Request;

      prismaMock.automobile.findUnique.mockResolvedValue({
        id: '1',
        plate: 'XYZ5678',
        color: 'Red',
        brand: 'Toyota',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.updateAutomobile(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Plate already registered' });
    });

    it('should handle internal server error', async () => {
      const req = {
        params: { id: '1' },
        body: {
          plate: 'XYZ5678',
          color: 'Blue',
          brand: 'Honda',
        },
      } as unknown as Request;

      prismaMock.automobile.findUnique.mockRejectedValueOnce(new Error('Database error'));

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await automobileController.updateAutomobile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteAutomobile', () => {
    it('should delete automobile successfully', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobile.delete.mockResolvedValue({});

      await automobileController.deleteAutomobile(req, res);

      expect(prismaMock.automobile.delete).toHaveBeenCalledWith({
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

      prismaMock.automobile.delete.mockRejectedValue(new Error('Database error'));

      await automobileController.deleteAutomobile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('listAutomobiles', () => {
    it('should list automobiles successfully', async () => {
      const req = {
        query: { color: 'Red', brand: 'Toyota' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobile.findMany.mockResolvedValue([
        { id: '1', plate: 'ABC1234', color: 'Red', brand: 'Toyota' },
      ]);

      await automobileController.listAutomobiles(req, res);

      expect(prismaMock.automobile.findMany).toHaveBeenCalledWith({
        where: { color: { equals: 'Red' }, brand: { equals: 'Toyota' } },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: '1', plate: 'ABC1234', color: 'Red', brand: 'Toyota' },
      ]);
    });

    it('should handle error', async () => {
      const req = {
        query: { color: 'Red', brand: 'Toyota' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      prismaMock.automobile.findMany.mockRejectedValue(new Error('Database error'));

      await automobileController.listAutomobiles(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
