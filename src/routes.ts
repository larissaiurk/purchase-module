import { Router } from "express";

import CallStock from "./controllers/CallStock";
import QuotationController from './controllers/QuotationController';

const router = Router();

router.post("/", CallStock.create);
router.post('/quotation', QuotationController.create);

export { router };