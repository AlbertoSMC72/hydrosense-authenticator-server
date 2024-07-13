import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserService } from '../services/users.service.js';
import { getCompanyService } from '../services/companys.service.js';

const secretJWT = process.env.SECRET_JWT || "eNbnClWA~c$~DI7X8fJ";

export const login = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await getUserService(email);
    const companyFound = await getCompanyService(email);

    if (!userFound && !companyFound) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    const isCorrectPass = userFound && bcrypt.compareSync(password, userFound.password);

    if (!isCorrectPass) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    if (userFound) {
        const payload = {
            user: {
                id_user: userFound.id_user
            }
        }
        const token = jwt.sign(payload, secretJWT, { expiresIn: '3h' });
        return res.status(200).json({
            user: userFound,
            token: token,
            rol: userFound.position
        });
    } else {
        const payload = {
            company: {
                id_company: companyFound.id_company
            }
        }
        const token = jwt.sign(payload, secretJWT, { expiresIn: '3h' });
        return res.status(200).json({
            company: companyFound,
            token: token,
            rol: "Admin"
        });
    }
}
