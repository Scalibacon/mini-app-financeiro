import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import accountService from "../service/account.service";
import transactionService from "../service/transaction.service";

class TransactionController {
  async create(request: Request, response: Response){
    try {
      const { value, creditedUsername } = request.body;
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        throw new Error('Nenhum token de acesso válido foi providenciado!');
      }

      if(!value || value <= 0){
        throw new Error('Valor inválido!');
      }

      if(!creditedUsername){
        throw new Error('Username inválido!');
      }

      const decodedData = jwt.verify(token, process.env.SECRET || "secret") as User;

      const debitedData = await accountService.fetchUser({ userId: decodedData.id });
      console.log('debitedData', debitedData);
      if (debitedData instanceof Error) throw new Error(debitedData.message);

      if(debitedData.balance < value){
        throw new Error('Saldo insuficiente para realizar a transação.')
      }

      const creditedData = await accountService.fetchUser({ username: creditedUsername });
      console.log('creditedData', creditedData);
      if (creditedData instanceof Error) throw new Error(creditedData.message);
      if(creditedData.userId === debitedData.userId){
        throw new Error('Não é possível fazer uma transação para você mesmo!');
      }

      const transaction = await transactionService.createTransaction({
        debitedAccountId: debitedData.accountId,
        creditedAccountId: creditedData.accountId,
        value
      });

      return response.status(201).json({ message: `Transação de ${value.toLocaleString('pt-br', { style: 'currency', 'currency': 'BRL' })} realizada com sucesso!` });
    } catch (error) {
      return response.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar transação'
      })
    }
  }

  async list(request: Request, response: Response){

    return response.status(200).json({ message: 'Listar transações!'});
  }
}

export default new TransactionController();