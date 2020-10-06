import { Router } from "express";

import ReceiveProductsController from "./controllers/ReceiveProductsController";
import QuotationController from './controllers/QuotationController';

const router = Router();

router.post("/receive-products", ReceiveProductsController.create);
router.post('/quotation/:idPurchaseRequest', QuotationController.create);

export { router };
