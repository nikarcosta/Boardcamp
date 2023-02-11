import { Router } from "express";
import { getAllCustomers, getCustomerById, addCustomer, updateCustomer } from "../controllers/customerController.js";
import { validateCustomer, validateIdCustomer, validateUpdateCustomer } from "../middlewares/customerValidationMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:id", validateIdCustomer, getCustomerById );
customersRouter.post("/customers", validateCustomer, addCustomer);
customersRouter.put("/customers/:id", validateIdCustomer, validateUpdateCustomer, updateCustomer);

export default customersRouter;