import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserService{
  async getAllUsers(){
    try{
      const users = await prisma.user.findMany();
      console.log('users', users);
    } catch(error){
      if(error instanceof Error) console.log('Error trying to fetch users', error.message);
    }
  }
}

export default new UserService;