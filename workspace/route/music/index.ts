import FastifyPlugin from "fastify-plugin"
import {SpotifyApi} from "@spotify/web-api-ts-sdk"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"

const sdk = SpotifyApi.withUserAuthorization(process.env.SPOTIFY_CLIENT_ID as string,"http://localhost:8000")

export default FastifyPlugin(async function(fastify,opt){
    RouteRegister(
        {fastify,route: RouteHelper({root: "music",end: ["track","search"]}),method:"POST"},
        async (request,reply) => {
            // 検索のクエリ部分仮置き
            const result = await sdk.search("I'm Fading Away" as string,["track"])
            reply.type("application/json")
            reply.send({
                tracks: await result.tracks.items
            })
        }
    )
    
    RouteRegister(
        {fastify,route: RouteHelper({root: "music",end: ["artist","search"]}),method: "POST"},
        async (request,reply) => {

            // 検索のクエリ部分仮置き
            const result = await sdk.search("三浦大知",["artist"])
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

const GetMusic = () => {
    
}