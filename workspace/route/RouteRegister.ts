import type { FastifyInstance, RouteHandlerMethod } from "fastify";
import type { RouteType } from "./RouteType";
import type RouteHelper from "./RouteType";

export default function RouteRegister<B, Q extends Record<string,string>,R extends Record<string,string>>({fastify,route,method}:{fastify:FastifyInstance ,route: RouteType,method: "GET" | "POST" | "DELETE"| "PUT"},func: RouteHandlerMethod) {
    if(method === "GET") {
        fastify.get<{Reply: R}>(route,func)
    }else if(method === "POST") {
        fastify.post<{Body: B, QueryString: Q}>(route,func)
    } else if(method === "DELETE") {
        fastify.delete(route,func)
    } else if(method === "PUT") {
        fastify.put<{Body: B, QueryString: Q}>(route,func)
    } else {
        throw new Error("想定していないデータが入りました")
    }
}

/*
念のため修正前差分
export default function RouteRegister({fastify,route,method}:{fastify:FastifyInstance ,route: RouteType,method: "GET" | "POST" | "DELETE"},func: RouteHandlerMethod) {
    if(method === "GET") {
        fastify.get(route,func)
    }else if(method === "POST") {
        fastify.post(route,func)
    } else if(method === "DELETE") {
        fastify.delete(route,func)
    } else {
        throw new Error("想定していないデータが入りました")
    }
}
*/