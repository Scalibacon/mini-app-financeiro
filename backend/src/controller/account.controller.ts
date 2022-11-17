import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import accountService from "../service/account.service";
import { validatePassword } from "../utils/stringUtils";

class AccountController {
  async create(request: Request, response: Response) {
    try {
      const username: string | undefined = request.body.username;
      const { password } = request.body;

      if (!username || username.length < 3) {
        throw new Error('O nome de usuário deve ter pelo menos 3 caracteres');
      }

      if(!validatePassword(password)){
        throw new Error('A senha deve ter pelo menos 8 caracteres e conter letras maiúsculas e números');
      }

      const token = await accountService.createUser(username, password);

      if (token instanceof Error) {
        return response.status(400).json({ error: token.message });
      }

      return response.status(201).json({ token: token });
    } catch (error) {
      return response.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar conta'
      })
    }
  }

  async find(request: Request, response: Response) {
    try {
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        throw new Error('Nenhum token de acesso válido foi providenciado!');
      }

      const decodedData = jwt.verify(token, process.env.SECRET || "secret") as User;

      const data = await accountService.fetchUser(decodedData.id);

      return response.status(200).json({ data: data });
    } catch (error) {
      return response.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao buscar suas informações :('
      })
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const token = await accountService.login(username, password);

      if (token instanceof Error) throw new Error(token.message);

      return response.status(201).json({ token: token });
    } catch (error) {
      return response.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao realizar login.'
      })
    }
  }
}

export default new AccountController();