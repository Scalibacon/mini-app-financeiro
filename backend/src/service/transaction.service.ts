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
    const teste = await prisma.account.findFirst({
      select: {
        balance: true,
        creditedTransactions: (!transactionType || transactionType === transactionTypes.CASH_IN) ? {
          select: {
            id: true,
            value: true,
            createdAt: true,
            debitedAccount: {
              select: {
                id: true,
                user: {
                  select: {
                    username: true
                  }
                }
              }
            }
          },
          where: {
            AND: [
              { createdAt:  { gte: initialDate } },
              { createdAt:  { lte: finalDate } },
            ],            
          }
        } : false,
        debitedTransactions: (!transactionType || transactionType === transactionTypes.CASH_OUT) ? {
          select: {
            id: true,
            value: true,
            createdAt: true,
            creditedAccount: {
              select: {
                id: true,
                user: {
                  select: {
                    username: true
                  }
                }
              }
            }
          },
          where: {
            AND: [
              { createdAt:  { gte: initialDate } },
              { createdAt:  { lte: finalDate } },
            ],            
          }
        } : false
      },
      where: {
        id: participantId,        
      }
    });

    return teste;
  }
}

export default new AccountService();