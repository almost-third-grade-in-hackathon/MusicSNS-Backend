import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
export default FastifyPlugin(async function(fastify,opt){
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "playlist",
            end: ["create"]
        })
    },async(request,reply) => {
        
    })
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "playlist",
            end: ["read"]
        })
    },async(request,reply) => {})
    RouteRegister({
        fastify,
        method: "GET",
        route: RouteHelper({
            root: "playlist",
            end: ["read","all"]
        })
    },async(request,reply) => {})
    RouteRegister({
        fastify,
        method: "PUT",
        route: RouteHelper({
            root: "playlist",
            end: ["update"]
        })
    },async(request,reply) => {})
    RouteRegister({
        fastify,
        method: "DELETE",
        route: RouteHelper({
            root: "playlist",
            end: ["delete"]
        }) 
    },async(request,reply) => {})
})