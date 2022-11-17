import { Request, Response, Router } from "express";
import accountRouter from "./account.routes";
import transactionRouter from "./transaction.routes";

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'Bem-vindo a API do mini app financeiro!'})
})

routes.use('/account', accountRouter);

routes.use('/transaction', transactionRouter);

export { routes };