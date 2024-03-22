
import pkg from 'fastify';

import registerVote from "./model/registerVote.js";
import consultVote from "./model/consultVotes.js";

const port = process.env.PORT || 3030;
const fastify = pkg({
    logger: false,
});

fastify.get("/ping", (req, res) => {
    res.send('pong');
});

fastify.post("/vote", async (req, res) => {
    const vote = await req.body;
    if (vote["lang"] == null) {
        res.status(400);
        res.send("Parâmetros inválidos");
        return;
    }
    const registerStatus = await registerVote(vote["lang"]);

    if (registerStatus == null) {
        res.status(501);
        res.send("Erro interno, não foi possível cadastrar o voto");
        return;
    }
    res.status(200);
    res.send("Voto concluido");
});

fastify.get("/result", async (req, res) => {
    const myRes = await consultVote();

    res.type("application/json");
    res.status(200);
    res.send(myRes);
});

fastify.listen({ port: process.env.PORT }, (err, address) => {
    if (err) {
        console.log("Error: " + err);
        process.exit(1);
    } else {
        console.log(`server running on ${address}`);
    }
});
