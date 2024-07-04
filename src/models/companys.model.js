import zod from 'zod';

const companySchema = zod.object({
    name: zod.string({
        message: 'Name is required',
    }),
    email: zod.string({
        message: 'Email is required',
    }).email(),
    password: zod.string({
        message: 'Password is required',
    }).min(8),
});

export function validateCompany(company) {
    const { error } = companySchema.safeParse(company);
    if (error) {
        throw new Error(error.message);
    }
}