import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../convex/_generated/api";

export default FastifyPlugin(async function(fastify,opt){
    /* POSTテーブルからGET (クエリパラメータを用いた条件検索は未実装)*/
    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "GET"},
        async (request, reply) => {
            reply.type("application/json")
            const httpClient = new ConvexHttpClient(process.env.CONVEX_URL);
            httpClient.query(api.post.getPost)
            .then(response => reply.send(response))
        }
    )

    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "POST"},
        async (request, reply) => {
            reply.type("application/json")
            const httpClient = new ConvexHttpClient(process.env.CONVEX_URL);
            httpClient.mutation(api.post.createPost, request.body.name)
            .then(response => reply.send(response))
        }
    )

    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "PUT"},
        async (request, reply) => {
            reply.type("application/json")
            const httpClient = new ConvexHttpClient(process.env.CONVEX_URL);
            httpClient.mutation(api.post.updatePost, request.body.name)
            .then(response => reply.send(response))
        }
    )

    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "DELETE"},
        async (request, reply) => {
            reply.type("application/json")
            const httpClient = new ConvexHttpClient(process.env.CONVEX_URL);
            httpClient.mutation(api.post.deletePost)
            .then(response => reply.send(response))
        }
    )
})