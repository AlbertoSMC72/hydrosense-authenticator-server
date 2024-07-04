import { getCompanyController,getCompanyController } from "../controllers/companys.controller";
import { Router } from 'express';

const companyRouter = Router();

companyRouter.get('/:email', getCompanyController);
companyRouter.post('/', postCompanyController);

export default companyRouter;