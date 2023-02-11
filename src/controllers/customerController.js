import { db } from "../database/db.js";
import moment from "moment";

export async function getAllCustomers(req, res){
    try{
        const { rows: customers } = await db.query("SELECT * FROM customers");

        formatDate(customers);

        res.send(customers);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os clientes!");
    }
}

export async function getCustomerById(req, res){

    try {

        const { customer } = res.locals;
    
        formatDate(customer);
    
        return res.send(customer);

      } catch (e) {

        console.log(e);

        res.status(500).send("Ocorreu um erro ao obter o cliente!");
      }


}

export async function addCustomer (req, res){
    const newCustomer = req.body;

    try{

        await db.query(`INSERT INTO customers (name, cpf, phone, birthday) VALUES ($1, $2, $3, $4)`, 
        [newCustomer.name, newCustomer.cpf, newCustomer.phone, newCustomer.birthday]);

        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao registrar o cliente!");

    }
}

function formatDate(customers) {
    Object.keys(customers).forEach(function (key) {
      customers[key].birthday = moment(customers.birthday)
        .utc()
        .format("YYYY-MM-DD");
    });
  }

  export async function updateCustomer (req, res) {
    
    const updatedCustomer = req.body;

    const { id } = req.params; 

    try {
        
        await db.query( `UPDATE customers SET name = $1,
        phone = $2,
        cpf = $3,
        birthday = $4 
        WHERE id = $5`,
        [updatedCustomer.name, updatedCustomer.phone, updatedCustomer.cpf, updatedCustomer.birthday, id] );
        
        res.sendStatus(201);
    
    } catch (e) {

        console.log(e);
        res.status(500).send("Ocorreu um erro ao registrar o cliente!");
        
    }
  }