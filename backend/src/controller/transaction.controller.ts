import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import moment from "moment";
import accountService from "../service/account.service";
import transactionService from "../service/transaction.service";

class TransactionController {
  async create(request: Request, response: Response) {
    try {
      const { value, creditedUsername } = request.body;
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        throw new Error('Nenhum token de acesso válido foi providenciado!');
      }

      if (!value || value <= 0) {
        throw new Error('Valor inválido!');
      }

      if (!creditedUsername) {
        throw new Error('Username inválido!');
      }

      const decodedData = jwt.verify(token, process.env.SECRET || "secret") as User;

      const debitedData = await accountService.fetchUser({ userId: decodedData.id });
      if (debitedData instanceof Error) throw new Error(debitedData.message);

      if (!debitedData.account || debitedData.account.balance < value) {
        throw new Error('Saldo insuficiente para realizar a transação.')
      }

      const creditedData = await accountService.fetchUser({ username: creditedUsername });
      if (creditedData instanceof Error) throw new Error(creditedData.message);

      if (creditedData.id === debitedData.id) {
        throw new Error('Não é possível fazer uma transação para você mesmo!');
      }

      await transactionService.createTransaction({
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

  async list(request: Request, response: Response) {
    try {
      const transactionType = request.query.transactionType as string | undefined;
      const initialDate = request.query.initialDate as string| undefined;
      const finalDate = request.query.finalDate as string| undefined;
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        throw new Error('Nenhum token de acesso válido foi providenciado!');
      }

      const decodedData = jwt.verify(token, process.env.SECRET || "secret") as User;

      const user = await accountService.fetchUser({ userId: decodedData.id });
      if (user instanceof Error) throw new Error(user.message);

      // sub 3 horas pq o banco tá operando com 3 horas a mais n sei pq :c
      const formattedInitialDate = initialDate ? moment(initialDate).subtract(3, 'hours').format() : undefined;
      const formattedFinalDate = finalDate ? moment(finalDate).add(1, 'days').subtract(3, 'hours').format() : undefined;

      const transactions = await transactionService.listTransactions({
        participantId: user.accountId,
        transactionType: transactionType ? parseInt(transactionType) : undefined,
        initialDate: formattedInitialDate,
        finalDate: formattedFinalDate
      })

      return response.status(200).json({ transactions });
    } catch (error) {
      return response.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar transação'
      })
    }
  }
}

export default new TransactionController();