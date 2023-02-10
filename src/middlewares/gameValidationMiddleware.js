import { gameSchema } from "../schemas/gameSchema.js";
import { db } from "../database/db.js";

export async function validateGame(req, res, next){

        const { error } = gameSchema.validate(req.body, { abortEarly: false});

        if(error) {
            const errorMessages = error.details.map(err => err.message);
            return res.status(400).send(errorMessages);
        }

        const { rows: gameExists } = await db.query( "SELECT * FROM games WHERE name = $1;",
        [req.body.name]);

        if(gameExists.length !==0){
            return res.sendStatus(409);
        }

        next();
}