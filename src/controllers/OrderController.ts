import { Request, Response } from 'express';
import { getRepository, createQueryBuilder, getConnection, getManager } from 'typeorm';
import Bill from '../models/Bill';
import BillToPay from '../models/BillToPay';

import Order from '../models/Order';
import Proposal from '../models/Proposal';
import Provider from '../models/Provider';

class OrderController {

  async index (request: Request, response: Response) {
    const orders: any = await createQueryBuilder("Order")
      .getMany();

    return response.status(200).json(orders);
  }

  async updateOrderStatus (request: Request, response: Response) {
    const { idOrder } = request.params;

    const { idChoosedProposal } = request.body;

    await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({ closed: true })
      .set({ status: 'CLOSED' })
      .where("id = :id", { id: idOrder })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(Proposal)
      .set({ choosed: true })
      .where("id = :id", { id: idChoosedProposal })
      .execute();  
      
      console.log('oi')
      const entityManager = getManager();
      const bill = new Bill();
      bill.documentId = 1
      bill.dueDate = new Date()
      bill.internNumber = 10
      bill.situation = 'open'
      bill.ourNumber = 1
  
      const billToPay = new BillToPay();

      const provider = await entityManager.findOne(Provider, 1);
    
      if(provider)
        billToPay.beneficiary = provider

      billToPay.bill = bill;
      
      
      await entityManager.save(bill);
      await entityManager.save(billToPay);
      

    return response.status(200).json(`Ordem atualizada com sucesso`);
  }
  
}

export default new OrderController();

