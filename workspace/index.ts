import Fastify from "fastify"
import type {TypeBoxTypeProvider} from "@fastify/type-provider-typebox"

const fastify = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.get("/",async function(request,reply) {
    reply.send({hello: "world!"})
})

const start = async () => {
    try {
        await fastify.listen({port: 8000})
    } catch(err){
        fastify.log.error(err)
        process.exit(1)
    }
}
start()