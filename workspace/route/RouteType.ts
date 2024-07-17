type Janr = "music" | "playlist" | "post" | "user"
type RouteType =`/${Janr}/${string}`

/**
 * @param root どの種類のAPIルートを作成するか
 * @param end なんという名前のエンドポイントを作るか
 * 
 * 
 * @example
 * ```
 * RouteRegister({
        fastify,
        method: "GET",
        route: "/music/test",
    },(request,reply) => {
        reply.send({Hello: "World!"})
    })
 * ```
 */

function RouteHelper({root,end}: {root: Janr,end: string}): RouteType {
    return `/${root}/${end}`
}

export type {Janr,RouteType}
export default RouteHelper