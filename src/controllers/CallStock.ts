import { Request, Response } from "express";

class CallStock {
  async create(request: Request, response: Response) {
  
    return response.status(200).json({ message: 'Ok' });
  }
}

export default new CallStock();