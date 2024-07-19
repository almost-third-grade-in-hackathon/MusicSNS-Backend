import FastifyPlugin from "fastify-plugin"
import {SpotifyApi, type Artist, type Track} from "@spotify/web-api-ts-sdk"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"

const sdk = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
)


export default FastifyPlugin(async function(fastify,opt){
    RouteRegister<{
        search: string
    } ,{
    
    },{
        tracks: Array<Track>,
        artists: Array<Artist>,
    } >(
        {fastify,route: RouteHelper({root: "music",end: ["track","search"]}),method:"POST"},
        async (request,reply) => {
            const {search} = request.query
            reply.status(200).type("application/json").send({
                tracks: (await sdk.search(search,["track"])).tracks.items
            })
        }
    )
    
    RouteRegister(
        {fastify,route: RouteHelper({root: "music",end: ["artist","search"]}),method: "POST"},
        async (request,reply) => {
            // 検索のクエリ部分仮置き
            const result = await sdk.search(search_word,["artist"])
            reply.type("application/json")
            reply.send({
                artists: result.artists.items
            })
        }
    )

    RouteRegister(
        {fastify,route: RouteHelper({root: "music",end: ["category","search"]}),method: "POST"},
        async (request,reply) => {
            const result = await sdk.browse.getCategories("JP","ja_JP",10)
            reply.type("application/json")
            reply.send({
                artists: result.categories.items
            })
        }
    )
})
