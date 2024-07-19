import type { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from "fastify";
import type { RouteType } from "./RouteType";

export default function RouteRegister<Q extends {[x in string]: string},H extends {[x in string]: string}, R extends {[x in string]: any}>({fastify,route,method}:{fastify:FastifyInstance ,route: RouteType,method: "GET" | "POST" | "DELETE"| "PUT"},func: RouteHandlerMethod) {
    if(method === "GET") {
        fastify.get<{
            QueryString: Q,
            Header: H,
            Reply: R
    }>(route,func)
    }else if(method === "POST") {
        fastify.post<{
            QueryString: Q,
            Header: H,
            Reply: R
        }>(route,func)
    } else if(method === "DELETE") {
        fastify.delete<{
            QueryString: Q,
            Header: H,
            Reply: R
        }>(route,func)
    } else if(method === "PUT") {
        fastify.put<{
            QueryString: Q,
            Header: H,
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