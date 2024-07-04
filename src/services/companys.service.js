import { getCompany, createCompany } from "../repositories/companys.repositories";
import { validateCompany } from "../models/companys.model";
import bcrypt from 'bcrypt';

export const getCompanyService = async (email) => {
    try {
        const company = await getCompany(email);
        return company;
    }
    catch (error) {
        throw error;
    }
}

export const createCompanyService = async (company) => {
    try {
        const validateCompanyResult = validateCompany(company)
        if (validateCompanyResult.success) {
            let { password } = company;
            password = bcrypt.hashSync(password, saltRounds);
            const companyRes = await createCompany({ ...company, password });
            return companyRes;
        }
        else {
            throw new Error(validateCompanyResult.error.message)
        }
    }
    catch (error) {
        throw error;
    }
}