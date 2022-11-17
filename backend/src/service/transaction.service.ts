import { prisma } from "../lib/prisma";

interface TransactionType {
  debitedAccountId: number,
  creditedAccountId: number,
  value: number
}

class AccountService{
  async createTransaction({
    debitedAccountId, 
    creditedAccountId, 
    value
  }: TransactionType){
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

  async listTransactions(accountId: number){

  }
}

export default new AccountService();