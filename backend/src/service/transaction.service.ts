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
  initialDate?: Date,
  finalDate?: Date
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
        createdAt: new Date()
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
        ...(initialDate ? { createdAt: { gte: initialDate } } : {}),
        ...(finalDate ? { createdAt: { lte: finalDate } } : {}),
        
      },
    });

    return transactions;
  }
}

export default new AccountService();