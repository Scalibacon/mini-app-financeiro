import { Router } from "express";
import accountController from "../controller/account.controller";

const accountRouter = Router();

accountRouter.post('/', accountController.create);

accountRouter.get('/', accountController.find);

accountRouter.post('/login', accountController.login);

export default accountRouter;