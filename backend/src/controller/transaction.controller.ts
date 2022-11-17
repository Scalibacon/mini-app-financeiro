import { Request, Response } from "express";

class TransactionController {
  async create(request: Request, response: Response){

    return response.status(201).json({ message: 'Criar transação!'});
  }

  async list(request: Request, response: Response){

    return response.status(200).json({ message: 'Listar transações!'});
  }
}

export default new TransactionController();