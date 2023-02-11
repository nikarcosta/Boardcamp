import { customerSchema } from "../schemas/customerSchema.js";
import { db } from "../database/db.js";

export async function validateCustomer(req, res, next){

    const { error } = customerSchema.validate(req.body, { abortEarly: false});

    if(error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).send(errorMessages);
    }

    const { rows: cpfExists } = await db.query("SELECT * FROM customers WHERE cpf = $1;",
    [req.body.cpf]);

    if(cpfExists.length !== 0){
        return res.sendStatus(409);
    }

    next();
}

export async function validateIdCustomer(req, res, next){

    const { id } = req.params;

    const { rows: customer } = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);

    if(customer.length === 0){
        return res.sendStatus(404);
    }

    next();
}


export async function validateUpdateCustomer(req, res, next){

    const { id } = req.params;

    const { error } = customerSchema.validate(req.body, { abortEarly: false});

    if(error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).send(errorMessages);
    }

    const { rows: cpfExists } = await db.query("SELECT * FROM customers WHERE cpf = $1 AND id <> $2",
    [req.body.cpf, id]);

    if(cpfExists.length !== 0){
        return res.sendStatus(409);
    }

    next();
}