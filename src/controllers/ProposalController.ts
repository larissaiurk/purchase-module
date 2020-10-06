import { Request, Response } from 'express';
import { getRepository, createQueryBuilder, getConnection } from 'typeorm';

import Proposal from '../models/Proposal';


class ProposalController {

  async index (request: Request, response: Response) {
    
    const proposals: any = await createQueryBuilder("Proposal")
      .leftJoinAndSelect("Proposal.quotation", "quotation")
      .leftJoinAndSelect("Proposal.provider", "provider")
      .getMany();

    return response.status(200).json(proposals);
  }

  async updateDates (request: Request, response: Response) {
    const { idProposal } = request.params;

    const { payment_date, delivery_date } = request.body;

    await getConnection()
      .createQueryBuilder()
      .update(Proposal)
      .set({ payment_date: payment_date, delivery_date: delivery_date})
      .where("id = :id", { id: idProposal })
      .execute();

    return response.status(200).json(`Proposta atualizada com sucesso`);
  }
  
}

export default new ProposalController();

