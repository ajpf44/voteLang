import Fastify from "fastify";
import registerVote from "./model/registerVote.js";
import consultVote from "./model/consultVotes.js";

const port = process.env.PORT || 3030;
const fastify = Fastify({
    logger: false,
});


fastify.get("/", (req, res) => {
    const str = "Hello World!";
    res.send(str);
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
        res.send("Internal error, cannot register this vote");
        return;
    }
    res.status(200);
    res.send("Voto concluido");
});

fastify.get("/result", async(req, res)=>{
    res.sendStatus(200);
    res.send(await consultVote())
})

fastify.listen({ port: port }, (err, address) => {
    if (err) {
        console.log("Error: " + err);
        process.exit(1);
    } else {
        console.log(`server running on ${address}`);
    }
});
