import moment from "moment";
import { prisma } from "../lib/prisma";

enum transactionTypes {
  CASH_IN = 1,
  CASH_OUT = 2
}

interface TransactionCreateType {
  debitedAccountId: number,
  creditedAccountId: number,
  value: number
}

interface TransactionFilterType {
  participantId: number,
  transactionType?: number | undefined,
  initialDate?: string,
  finalDate?: string
}

class AccountService {
  async createTransaction({
    debitedAccountId,
    creditedAccountId,
    value
  }: TransactionCreateType) {
    const transaction = await prisma.transaction.create({
      data: {
        value,
        debitedAccountId,
        creditedAccountId,
        createdAt: moment().format()
      }
    });

    await prisma.account.update({
      data: {
        balance: {
          decrement: value
        }
      },
      where: {
        id: debitedAccountId
      }
    });

    await prisma.account.update({
      data: {
        balance: {
          increment: value
        }
      },
      where: {
        id: creditedAccountId
      }
    });

    return transaction;
  }

  async listTransactions({
    participantId,
    transactionType,
    initialDate,
    finalDate
  }: TransactionFilterType) {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            ...(!transactionType || transactionType === transactionTypes.CASH_OUT ? { debitedAccountId: participantId } : {}),
          },
          {
            ...(!transactionType || transactionType === transactionTypes.CASH_IN ? { creditedAccountId: participantId } : {}),
          }
        ],
        AND: [
          {
            ...(initialDate ? { createdAt: { gte: initialDate } } : { id: { gte: 1 } }),
          },
          {
            ...(finalDate ? { createdAt: { lte: finalDate } } : { id: { gte: 1 } }),
          }
        ]
      },
    });

    return transactions;
  }
}

export default new AccountService();