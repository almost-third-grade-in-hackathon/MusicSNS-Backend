import type { FastifyBaseLogger, FastifyInstance, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteHandlerMethod } from "fastify";
import type { RouteType } from "./RouteType";
import type { IncomingMessage, ServerResponse } from "http";

export default function RouteRegister<
    Q extends {[x in string]: string},
    H extends {[x in string]: string},
    R extends {[x in string]: any}
>(
    {fastify,
    route,
    method}:
    {fastify:FastifyInstance ,
    route: RouteType,
    method: "GET" | "POST" | "DELETE"| "PUT"},
    func: RouteHandlerMethod<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, { Querystring: Q; Headers: H; Reply: R}, unknown, FastifySchema, FastifyTypeProviderDefault, FastifyBaseLogger>) 
    {
    if(method === "GET") {
        fastify.get<{
            Querystring: Q,
            Headers: H,
            Reply: R
    }>(route,func)
    }else if(method === "POST") {
        fastify.post<{
            Querystring: Q,
            Headers: H,
            Reply: R
        }>(route,func)
    } else if(method === "DELETE") {
        fastify.delete<{
            Querystring: Q,
            Headers: H,
            Reply: R
        }>(route,func)
    } else if(method === "PUT") {
        fastify.put<{
            Querystring: Q,
            Headers: H,
            Reply: R
        }>(route,func)
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
