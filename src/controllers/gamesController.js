import { db } from "../database/db.js";

export async function getAllGames(req, res){
    try{
        const result = await db.query("SELECT * FROM games");
        res.send(result.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os jogos!");
    }
}

export async function addGame(req, res){
    const newGame = req.body;

    try{
   
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, 
        [newGame.name, newGame.image, Number(newGame.stockTotal), Number(newGame.pricePerDay)]);
        
        res.sendStatus(201);
        
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao registrar o jogo!");
    }
}