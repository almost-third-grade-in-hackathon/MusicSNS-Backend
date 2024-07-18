import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default FastifyPlugin(async function(fastify,opt){
    /* POSTテーブルからGET (クエリパラメータを用いた条件検索は未実装)*/
    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "GET"},
        async (request, reply) => {
            const response_data = useQuery(api.post.getPost, {});
            reply.type("application/json")
            reply.send(response_data)
        }
    )

    RouteRegister(
        

        {fastify, route: RouteHelper({root: "post", end: []}), method: "POST"},
        async (request, reply) => {
            request.body
            const response_status = useMutation(api.post.postPost, {});
        }
    )

    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "PUT"},
        async (request, reply) => {
            const response_data = useMutation(api.post.createPost, {});
        }
    )

    RouteRegister(
        {fastify, route: RouteHelper({root: "post", end: []}), method: "DELETE"},
        async (request, reply) => {
            const response_data = useMutation(api.post.deletePost, {});
        }
    )
})


const CreatePost = () => {

}

const DeletePost = () => {

}

const LikeSubmit = () => {

}

const LikeDesubmit = () => {
    
}