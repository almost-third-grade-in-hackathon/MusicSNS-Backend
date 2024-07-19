import FastifyPlugin from "fastify-plugin"
import RouteRegister from "../RouteRegister"
import RouteHelper from '../RouteType';
import { auth, signIn } from "../../auth";

export default FastifyPlugin(async function(fastify,opt){
    RouteRegister({
        fastify,
        route: RouteHelper({
            root: "auth",
            end: [".well-known","openid-configuration"]
        }),
        method: "GET"
    },async(request,reply) => {
        reply.status(200)
            .header("Content-Type","application/json")
            .header("Cache-Control","public, max-age=15, stale-while-revalidate=15, stale-if-error=86400")
            .send({
                issuer: process.env.CONVEX_SITE_URL,
				jwks_uri: process.env.CONVEX_SITE_URL + "/.well-known/jwks.json",
				authorization_endpoint: process.env.CONVEX_SITE_URL + "/oauth/authorize",
            })
    })
    RouteRegister({
        fastify,
        route: RouteHelper({
            root: "auth",
            end: [".well-known","jwks.json"]
        }),
        method: "GET"
    },async(request,reply) => {
        if (process.env.JWKS === undefined) {
            throw new Error("Missing JWKS Convex environment variable");
        }
        reply.status(200)
            .header("Content-Type","application/json")
            .header("Cache-Control","public, max-age=15, stale-while-revalidate=15, stale-if-error=86400")
            .send(process.env.JWKS)
    })
    RouteRegister({
        fastify,
        route: RouteHelper({
            root: "auth",
            end: ["signin"]
        }),
        method: "POST"
    },async(request,reply) => {
        
    })
    
})

