import type { FastifyInstance, RouteHandlerMethod } from "fastify";
import type { RouteType } from "./RouteType";
import type RouteHelper from "./RouteType";

export default function RouteRegister<T, QueryString>({fastify,route,method}:{fastify:FastifyInstance ,route: RouteType,method: "GET" | "POST" | "DELETE"| "PUT"},func: RouteHandlerMethod) {
    if(method === "GET") {
        fastify.get<{Reply: T}>(route,func)
    }else if(method === "POST") {
        fastify.post<{Body: T, QueryString: QueryString}>(route,func)
    } else if(method === "DELETE") {
        fastify.delete(route,func)
    } else if(method === "PUT") {
        fastify.put<{Body: T, QueryString: QueryString}>(route,func)
    } else {
        throw new Error("想定していないデータが入りました")
    }
}