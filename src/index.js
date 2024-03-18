import Fastify from "fastify";
import registerVote from "./controller/registerVote.js";

const fastify = Fastify({
    logger: false,
});

fastify.get("/", (req, res) => {
    const str = "Hello World!";
    console.log(str);
    res.send(str);
});

fastify.post("/vote", async (req, res) => {
    const params = req.params;
    const vote = await req.body;
    if (vote["lang"] == null || vote["votes"] == null) {
        res.status(400);
        res.send("1Parâmetros inválidos");
        return;
    }
    const registerStatus = await registerVote(vote["lang"], vote["votes"]);

    if (registerStatus == null) {
        res.status(401);
        res.send("Parâmetros inválidos");
        return;
    }
    res.status(200);
    res.send("Voto concluido");
});

const port = 3030;
fastify.listen({ port: port }, (err, address) => {
    if (err) {
        console.log("Error: " + err);
        process.exit(1);
    } else {
        console.log(`server running on http://localhost:${port}/`);
    }
});
