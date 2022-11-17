import md5 from "md5";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";

class AccountService {
  async createAccount(initialBalance = 100) {
    const account = await prisma.account.create({
      data: {
        balance: initialBalance
      }
    });

    return account;
  }

  async createUser(username: string, password: string) {
    let user: User;
    let account = await this.createAccount();

    try {
      user = await prisma.user.create({
        data: {
          username,
          password: md5(password),
          accountId: account.id
        }
      });
    } catch (error: any) {
      await this.deleteAccount(account.id);

      return new Error('Username já cadastrado!');
    }

    const token = generateToken(user.id);
    return token;
  }

  async deleteAccount(accountId: number) {
    await prisma.account.delete({
      where: {
        id: accountId
      }
    });
  }

  async login(username: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
        password: md5(password)
      }
    });

    if (!user) {
      return new Error('Usuário e/ou senha incorreto(s)');
    }

    const token = generateToken(user.id);

    return token;
  }

  async fetchUser({
    userId,
    username
  }: {
    userId?: number,
    username?: string
  }) {
    if(!userId && !username){
      return new Error('Nenhum dado foi providenciado!')
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        username: username
      }
    });

    if (!user) {
      return new Error('Dados de usuário não encontrados.');
    }

    const account = await prisma.account.findFirst({
      where: {
        id: user.accountId,
      }
    });

    return {
      userId: user.id,
      username: user.username,
      accountId: account!.id,
      balance: account!.balance
    }
  }

  async testListUsers() {
    const users = await prisma.user.findMany();
    console.log('users', users);

    const accounts = await prisma.account.findMany();
    console.log('accounts', accounts);
  }
}

const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.SECRET ?? "secret", {
    expiresIn: '24h'
  });
}

export default new AccountService();