import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
import ConvexSubscribeClient from "../ConvexSubscribeClient"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

export default FastifyPlugin(async function(fastify,opt){
    RouteRegister<{
        name: string,
        ids: []
    },{},{
        result: string & {
            __tableName: "playlist";
        }        
    }>({
        fastify,
        method: "POST",
        route: "/playlist/create"
    },async(request,reply) => {
        reply.status(200).type("application/json")
            .send({
                result: await ConvexSubscribeClient.mutation(api.playlist.CreateList,{
                    name: request.query.name,
                    ids: request.query.ids
                })
            })
    })
    RouteRegister<{id: Doc<"playlist">["_id"]},{},{list:Doc<"playlist"> }>({
        fastify,
        method: "GET",
        route: "/playlist/read"
    },async(request,reply) => {
        reply.status(200).type("application/json").send({
            list:  await ConvexSubscribeClient.query(api.playlist.ReadList,{id: request.query.id})
        })
    })
    RouteRegister({
        fastify,
        method: "GET",
        route: "/playlist/read/all"
    },async(request,reply) => {
        reply.status(200).type("application/json").send({
            lists: await ConvexSubscribeClient.query(api.playlist.ReadLists,{})
        })
    })
    RouteRegister<{
        name: string,
        ids: Array<string>
        list_id: Doc<"playlist">["_id"]
    },{},{
    }>({
        fastify,
        method: "PUT",
        route: "/playlist/update"
    },async(request,reply) => {
        reply.status(200).type("application/json").send({
            result: await ConvexSubscribeClient.mutation(api.playlist.UpdateList,{
                name: request.query.name,
                ids: request.query.ids,
                list_id: request.query.list_id
            })
        })
    })
    RouteRegister<{id: Doc<"playlist">["_id"]},{},{}>({
        fastify,
        method: "DELETE",
        route: "/playlist/delete"
    },async(request,reply) => {
        await ConvexSubscribeClient.mutation(api.playlist.DeleteList,{
            id: request.query.id
        })
        reply.status(200)
    })
})