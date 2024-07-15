import Fastify from "fastify"
import type {TypeBoxTypeProvider} from "@fastify/type-provider-typebox"
import MusicRoute from "./route/music/index"
import PlaylistRoute from "./route/music/index"
import PostRoute from "./route/post/index"
import UserRoute from "./route/user/index"

const fastify = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.get("/",async function(request,reply) {
    reply.send({hello: "world!"})
})

fastify.register(MusicRoute,{
    prefix: "/music"
})

fastify.register(UserRoute,{
    prefix: "/user"
})

fastify.register(PostRoute,{
    prefix: "/post"
})

fastify.register(PlaylistRoute,{
    prefix: "/playlist"
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