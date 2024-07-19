import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from '../RouteType';
import { signIn, signOut } from "../../auth";
import ConvexSubscribeClient from "../ConvexSubscribeClient";
import { api } from "../../convex/_generated/api";

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
        rep.status(200).type("application/json").send({
            response: await signIn("google")
        })
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
        return await signIn("google")
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
        return signOut()
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
