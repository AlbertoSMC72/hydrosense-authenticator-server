import { validateUser, validateUserUpdate } from '../models/users.model.js';
import config from '../config/config.js';
// reposotory of mysql


export const getUsers = async () => {
    try {
        const result = await config.query('SELECT * FROM users');
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUser = async (email) => {
    try {
        const result = await config.query('SELECT * FROM users WHERE email = ?', [email]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createUser = async (user) => {
    try {
        validateUser(user);
        const result = await config.query('INSERT INTO users SET ?', [user]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (email, user) => { 
    try {
        validateUserUpdate(user);
        const oldInfo = getUser(email);
        if (!oldInfo) {
            throw new Error('User not found');
        }
        const updateInfo = { ...oldInfo, ...user };
        const result = await config.query('UPDATE users SET ? WHERE email = ?', [updateInfo, email]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUser = async (email) => { 
    try {
        const result = await config.query('DELETE FROM users WHERE email = ?', [email]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
};