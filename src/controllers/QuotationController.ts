import { Request, Response } from 'express';
import { getRepository, createQueryBuilder, getManager } from 'typeorm';

import groupBy from '../utils/groupBy';

import Quotation from '../models/Quotation';
import Order from '../models/Order';
import Responsible from '../models/Responsible';
import Proposal from '../models/Proposal';
import Provider from '../models/Provider';
import ProposalProduct from '../models/ProposalProduct';

import ReceiveProductsController from './ReceiveProductsController';


class QuotationController {

  async index (request: Request, response: Response) {
    const { idQuotation } = request.params;

    const quotation: any = await createQueryBuilder("Proposal")
      .leftJoinAndSelect("Proposal.quotation", "quotation")
      .where("Proposal.quotation.id = :quotationId", { quotationId: idQuotation })
      .getMany();

    return response.status(200).json(quotation);
  }
  
  async create (request: Request, response: Response) {

    const { productIds, responsibleId, produtctQtd } = request.body;

    const topProviders: any = await createQueryBuilder("ProductProvider")
      .leftJoinAndSelect("ProductProvider.product", "product")
      .leftJoinAndSelect("ProductProvider.provider", "provider")
      .where("ProductProvider.product.id in (:...productId)", { productId: productIds })
      .orderBy("ProductProvider.provider.id, ProductProvider.price")
      .getMany();

  
    const entityManager = getManager();

    const order = new Order();
    order.type = 'Solicitação de Compra';

    const responsible = await entityManager.findOne(Responsible, responsibleId);
    if(responsible)
      order.responsible = responsible;

    order.closed = false;

    const quotation = new Quotation();
    quotation.order = order;

    const quotations = [];
    quotations.push(quotation);

    order.quoatations = quotations;

    await entityManager.save(order);
    await entityManager.save(quotation);


    let totalProposals = 1;
    let providerAlreadySaved = false;
    let providersSavedId: any[] = [];
    
    
    topProviders.forEach(async (topProvider: any) => {
      //totalizar no max 3 propostas
      providerAlreadySaved = false;
      if(totalProposals < 4){
        const findProvider = providersSavedId.find((item: any) => {
          return item === topProvider.provider.id;
        })
        
        if(findProvider) {
          providerAlreadySaved = true;
        }

        providersSavedId.push(topProvider.provider.id);
        if(providerAlreadySaved){ 
          //proposal
          totalProposals= (totalProposals+1);

          const proposal = new Proposal();
          proposal.quotation = quotation;
          const providerItem = await entityManager.findOne(Provider, topProvider.provider.id);

          if(providerItem)
            proposal.provider = providerItem;
          await entityManager.save(proposal);


          //proposal products
          const productsForProposal = topProviders.filter((item: any) => {
            return item.provider.id === topProvider.provider.id;
          });
          productsForProposal.forEach(async (proposalProductItem:any) => {
            const proposalProduct = new ProposalProduct();
            proposalProduct.proposal = proposal;
            proposalProduct.price = proposalProductItem.price;
            proposalProduct.quantity = produtctQtd;
            await entityManager.save(proposalProduct);
          });
        }
      }
    })
    return response.status(200).json(`Solicitação gerou propostas com suceeso. ID cotação: ${quotation.id}`);
  }
}

export default new QuotationController();

