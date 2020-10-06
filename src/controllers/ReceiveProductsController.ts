import { Request, Response } from "express";
import StockService from "../api/Stock/endpoints";

import fs from 'fs';
import FormData from "form-data";

class ReceiveProductsController {
  async create(request: Request, response: Response) {

    let { productDepositMovementList } = request.body;
    productDepositMovementList = JSON.parse(productDepositMovementList);

    if (!productDepositMovementList) {
      return response.status(400).json({ message: 'required field productDepositMovementList' });
    }

    const formData = new FormData();
    formData.append("type", "NF");
    // @ts-ignore: Unreachable code error
    formData.append("sourceFile", request.file);

    try {

      const documentResponse = await StockService.createDocument(formData);

      const { id } = documentResponse.data;
 
      const data = {
        documentId: id,
        productDepositMovementList
      }

      const buyProductsResponse: any = await StockService.buyProducts(data);
 
      return response.status(200).json(buyProductsResponse.data);

    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  }
}

export default new ReceiveProductsController();