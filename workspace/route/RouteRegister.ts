import type { FastifyBaseLogger, FastifyInstance, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteHandlerMethod } from "fastify";
import type { RouteType } from "./RouteType";
import type { IncomingMessage, ServerResponse } from "http";
import type { Doc, TableNames } from "../convex/_generated/dataModel";


/**
 * @param エンドポイント処理決めつよつよ関数。`RouteHelpler`と共に運用する
 * @argument Q:クエリの型
 * @argument H:ヘッダーの型
 * @argument R:返すJSONの値の型
 * @argument fastify:Fastifyのインスタンス
 * @argument route:エンドポイントのルートの文字列。`RouteHelper`を使って定義！
 * @argument method:HTTPメソッドの名前
 * @argument func:処理内容を書く！
 */
export default function RouteRegister<
    Q extends {[x in string]: string | Array<string> | (Doc<TableNames>)["_id"]},
    H extends {[x in string]: string},
    R extends {[x in string]: any} | string
>(
    {fastify,
    route,
    method,
    }:
    {fastify:FastifyInstance ,
    route: RouteType,
    method: "GET" | "POST" | "DELETE"| "PUT"},
    func: RouteHandlerMethod<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, { Querystring: Q; Headers: H; Reply: R}, unknown, FastifySchema, FastifyTypeProviderDefault, FastifyBaseLogger>,
) 
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
