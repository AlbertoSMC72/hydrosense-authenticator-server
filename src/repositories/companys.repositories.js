import { validateCompany } from "../models/companys.model";
import config from "../config/config";

export const getCompany = async (email) => {
    try {
        const result = await config.query('SELECT * FROM companys WHERE email = ?', [email]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}   

export const createCompany = async (company) => {
    try {
        validateCompany(company);
        const result = await config.query('INSERT INTO companys SET ?', [company]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

