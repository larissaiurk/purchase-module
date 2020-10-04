import { Request, Response } from "express";
import stockApi from "../api/Stock/config";

class ReceiveProductsController {
  async create(request: Request, response: Response) {

    
    return response.status(200).json({ message: 'Ok' });
  }
}

export default new ReceiveProductsController();