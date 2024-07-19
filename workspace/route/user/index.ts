import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from '../RouteType';

new Response()

export default FastifyPlugin(async function(fastify,opt){
    /**Create */
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "user",
            end: ["create"]
        })
    },async (req,rep) => {

    })
    /**Login */
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "user",
            end: ["login"]
        })
    },async (req,rep) => {

    })
    /**Logout */
    RouteRegister({
        fastify,
        method: "POST",
        route: RouteHelper({
            root: "user",
            end: ["logout"]
        })
    },async (req,rep) => {

    })
    /** Delete */
    RouteRegister({
        fastify,
        method: "DELETE",
        route: RouteHelper({
            root: "user",
            end: ["delete"]
        })
    },async (req,rep) => {
        
    })

})
