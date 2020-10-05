import { Request, Response } from 'express';
import { getRepository, createQueryBuilder, getManager } from 'typeorm';

import groupBy from '../utils/groupBy';

import Quotation from '../models/Quotation';
import Order from '../models/Order';
import Responsible from '../models/Responsible';
import Proposal from '../models/Proposal';
import Provider from '../models/Provider';

import ReceiveProductsController from './ReceiveProductsController';


class QuotationController {
  async index (request: Request, response: Response) {
    const repository = getRepository(Quotation);
    return response.json({message: 'oi'});
  }
  
  async create (request: Request, response: Response) {
    const { idPurchaseRequest } = request.params;
    
    console.log(request.body);

    const { productIds, responsibleId } = request.body;

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

    const formatted = groupBy(topProviders, 'provider');
    
    // productIds.forEach((product: any) => {
    //   const topProvidersByProduct = topProviders.filter((item: any) => item.product.id === product)
    //   console.log('filter', topProvidersByProduct);
    // });

    let totalProposals = 0;

    topProviders.forEach(async (topProvider: any) => {
      //totalizar no max 3 propostas

      if(totalProposals <= 3){
        const proposal = new Proposal();
        proposal.quotation = quotation;

        const providerItem = await entityManager.findOne(Provider, topProvider.provider.id);
        if(providerItem)
          proposal.provider = providerItem;

        // let alredyExists = null;
        // if(providerItem) {
        //   const proposalRepository = getRepository(Proposal);
        //   alredyExists = await proposalRepository.find({ where: { quotation: quotation, provider: providerItem } });
        //   console.log('proposalRepository ja existe', alredyExists);
        // }

        totalProposals += 1;
      }
    })


    // const entityManager = getManager(); // you can also get it via getConnection().manager
    // const quotation = await entityManager.findOne(User, 1);
    // quotation.orderId = "Umed";
    // await entityManager.save(user);

    // criar cotacao

    // topProviders.forEach((provider: any) => {
    //   const proposal = {
    //     quotationId: 1,
    //     providerId: provider.id,
    //   }
      
    // });


    return response.json(topProviders);
  }
}

export default new QuotationController();

