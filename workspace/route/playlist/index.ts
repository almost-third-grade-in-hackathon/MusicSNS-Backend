import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
import ConvexSubscribeClient from "../ConvexSubscribeClient"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"
export default FastifyPlugin(async function(fastify,opt){
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "playlist",
            end: ["create"]
        })
    },async(request,reply) => {
        reply.status(200).type("application/json")
            .send({
                result: ConvexSubscribeClient.mutation(api.playlist.CreateList,{
                    name: "",
                    ids: []
                })
            })
    })
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "playlist",
            end: ["read"]
        })
    },async(request,reply) => {
        reply.status(200).type("applicatiom/json").send({
            list:  await ConvexSubscribeClient.query(api.playlist.ReadList,{id: {}})
        })
    })
    RouteRegister({
        fastify,
        method: "GET",
        route: RouteHelper({
            root: "playlist",
            end: ["read","all"]
        })
    },async(request,reply) => {
        reply.status(200).type("application/json").send({
            lists: await ConvexSubscribeClient.query(api.playlist.ReadLists,{})
        })
    })
    RouteRegister({
        fastify,
        method: "PUT",
        route: RouteHelper({
            root: "playlist",
            end: ["update"]
        })
    },async(request,reply) => {
        reply.status(200).type("application/json").send({
            result: await ConvexSubscribeClient.query(api.playlist.UpdateList,{

            })
        })
    })
    RouteRegister({
        fastify,
        method: "DELETE",
        route: RouteHelper({
            root: "playlist",
            end: ["delete"]
        }) 
    },async(request,reply) => {
        reply.status(200).send({
            result: ConvexSubscribeClient.onUpdate(api.playlist.DeleteList,{},(val) => {
                console.log(val)
            },(err) => {throw err})
        })
    })
})