import joi from "joi";

export const customerSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().trim().pattern(/[0-9]{10,11}/).required(),
    phone: joi.string().trim().pattern(/[0-9]{11}/).required(),
    birthday: joi.date().min("1900-01-01").max(Date.now()).required()
});