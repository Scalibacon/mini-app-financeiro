import { Router } from "express";
import transactionController from "../controller/transaction.controller";

const transactionRouter = Router();

transactionRouter.post('/', transactionController.create);

transactionRouter.get('/', transactionController.list);

export default transactionRouter;