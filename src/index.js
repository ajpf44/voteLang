import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
});

fastify.get("/", (req, res) => {
    const str = "Hello World!";
    console.log(str);
    res.send(str);
});

fastify.post("/vote", async (req, res) => {
    const params = req.params;

    console.log(params);
    const vote = await req.body;

    res.status(200);
    res.send("Voto concluido");
});

fastify.listen(3030, () => {
    console.log(`server running on http://localhost:3030/`);
});
