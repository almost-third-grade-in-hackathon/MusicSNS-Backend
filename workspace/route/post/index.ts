import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";


const client = new ConvexHttpClient(process.env.CONVEX_URL);

export default FastifyPlugin(async function(fastify,opt){
    /* POSTテーブルからGET (クエリパラメータを用いた条件検索は未実装)*/
    fastify.get("/post", async (request, reply) => {
        const res = await client.query(api.post.getPost, {});
        reply.type("application/json")
        reply.send(res);
    })

    /* 記事を投稿 */
    fastify.post("/post", async (request, reply) => {
        console.log(request.body)
        const res = await client.mutation(api.post.createPost, {});
        reply.type("application/json")
        reply.send(res);
    })

    /* 記事を更新 */
    fastify.put("/post", async (request, reply) => {
        const res = await client.mutation(api.post.updatePost, {});
        reply.type("application/json")
        reply.send(res);
    })

    /* 記事削除 */
    fastify.delete("/post", async (request, reply) => {
        const res = await client.mutation(api.post.deletePost, {});
        reply.type("application/json")
        reply.send(res);
    })
})