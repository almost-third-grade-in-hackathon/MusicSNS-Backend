import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from '../RouteType';

new Response()

export default FastifyPlugin(async function(fastify,opt){
    /**Create */
    RouteRegister({
        fastify,
        method: "POST"
    },async () => {})
    /**Login */
    RouteRegister({
        fastify,
        method: "POST"
    },async () => {})
    /**Logout */
    RouteRegister({
        fastify,
        method: "POST"
    },async () => {})
    /** Delete */
    RouteRegister({
        fastify,
        method: "DELETE"
    },async () => {})

})
