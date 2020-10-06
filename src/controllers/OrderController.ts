import { Request, Response } from 'express';
import { getRepository, createQueryBuilder, getConnection } from 'typeorm';

import Order from '../models/Order';
import Proposal from '../models/Proposal';

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
      .where("id = :id", { id: idOrder })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(Proposal)
      .set({ choosed: true })
      .where("id = :id", { id: idChoosedProposal })
      .execute();      

    return response.status(200).json(`Ordem atualizada com sucesso`);
  }
  
}

export default new OrderController();

