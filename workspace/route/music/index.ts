import FastifyPlugin from "fastify-plugin"
import {SpotifyApi} from "@spotify/web-api-ts-sdk"
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"

const sdk = SpotifyApi.withUserAuthorization(process.env.SPOTIFY_CLIENT_ID as string,"http://localhost:8000")

export default FastifyPlugin(async function(fastify,opt){
    RouteRegister(
        {fastify,route: RouteHelper({root: "music",end: ["track","search"]}),method:"POST"},
        async (request,reply) => {
            const result = sdk.search("I'm Fading Away" as string,["track"])
            reply.type("application/json")
            reply.send({
                tracks: (await result).tracks.items
            })
        }
    )
    RouteRegister
})

const GetMusic = () => {
    
}