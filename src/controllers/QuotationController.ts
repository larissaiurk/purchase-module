import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Quotation from '../models/Quotation';

class QuotationController {
  async index (request: Request, response: Response) {
    const repository = getRepository(Quotation);
    return response.json({message: 'oi'});
  }
  
  async create (request: Request, response: Response) {
    const repository = getRepository(Quotation);
    return response.json({message: 'oi'});
  }
}

