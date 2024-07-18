type Janr = "music" | "playlist" | "post" | "user" | "auth"
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

function RouteHelper({root,end}: {root: Janr,end: string[]}): RouteType {
    const first = end.shift() as string
    if(end.length === 0){
        return `/${root}/${first}`
    }else {
        const result = end.map(val => `/${val}`).join("")
        const connect = `${first}${result}`
        return `/${root}/${connect}`
    }
}

export type {Janr,RouteType}
export default RouteHelper