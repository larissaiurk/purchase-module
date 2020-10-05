import { Router } from "express";

import CallStock from "./controllers/CallStock";
import QuotationController from './controllers/QuotationController';
import ProposalController from './controllers/ProposalController';

const router = Router();

router.post("/", CallStock.create);

router.get('/quotation/:idQuotation', QuotationController.index);
router.post('/quotation', QuotationController.create);

router.get('/proposal', ProposalController.index);
router.put('/proposal/:idProposal', ProposalController.update);

export { router };
