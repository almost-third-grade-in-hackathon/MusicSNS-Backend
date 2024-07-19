import FastifyPlugin from "fastify-plugin"
import { api } from "../../convex/_generated/api";
import ConvexSubscribeClient from "../ConvexSubscribeClient";
import RouteRegister from "../RouteRegister"
import RouteHelper from "../RouteType"
import type { Doc } from "../../convex/_generated/dataModel"

export default FastifyPlugin(async function(fastify,opt){
    /* 記事取得　*/
    RouteRegister<{}, {}, {
        post: Doc<"post">
    }>(
        {fastify,route: RouteHelper({root: "post",end: []}),method:"GET"},
        async (request,reply) => {
            const res = await ConvexSubscribeClient.query(api.post.getPost, {});
            reply.type("application/json")
            .send({ post: res });
        }
    )

    /* 記事検索　*/
    RouteRegister<{
        q: string
    }, {}, {
        post: Doc<"post">
    }>(
        {fastify,route: RouteHelper({root: "post",end: []}),method:"GET"},
        async (request,reply) => {
            const res = await ConvexSubscribeClient.query(api.post.searchPost, {q: request.query.q});
            reply.type("application/json")
            .send({ post: res });
        }
    )

    /* 記事を投稿 */
    RouteRegister<{
        user_id: string,
        contents: string,
        playlist_id: string,
        music_id: string,
    }, {}, {
        post: Doc<"post">
    }>(
        {fastify,route: RouteHelper({root: "post",end: []}),method:"POST"},
        async (request,reply) => {
            const res = await ConvexSubscribeClient.mutation(api.post.createPost, {
                user_id: request.query.user_id,
                contents: request.query.contents,
                playlist_id: request.query.playlist_id,
                music_id: request.query.music_id,
            });
            reply.type("application/json")
            reply.send({ post: res });
        }
    )

    /* 記事を更新 */
    RouteRegister<{
        id: Doc<"post">["_id"],
        contents: string,
        playlist_id: string,
        music_id: string,
    }, {}, {
        post: Doc<"post">
    }>(
        {fastify,route: RouteHelper({root: "post",end: []}),method:"PUT"},
        async (request,reply) => {
            const res = await ConvexSubscribeClient.mutation(api.post.updatePost, {
                id: request.query.id,
                contents: request.query.contents,
                playlist_id: request.query.playlist_id,
                music_id: request.query.music_id
            });
            reply.type("application/json")
            reply.send({ post: res });
        }
    )

    /* 記事削除 */
    RouteRegister<{
        id: Doc<"post">["_id"]
    }, {}, {
        post: Doc<"post">
    }>(
        {fastify,route: RouteHelper({root: "post",end: []}),method:"DELETE"},
        async (request,reply) => {
            const res = await ConvexSubscribeClient.mutation(api.post.deletePost, {
                id: request.query.id
            });
            reply.type("application/json")
            reply.send({post: res});
        }
    )


    /*
    fastify.get("/post", async (request, reply) => {
        const res = await ConvexSubscribeClient.query(api.post.getPost, {});
        reply.type("application/json")
        reply.send(res);
    })

    fastify.post("/post", async (request, reply) => {
        const res = await ConvexSubscribeClient.mutation(api.post.createPost, {});
        reply.type("application/json").send(res);
    })
    
    fastify.put("/post", async (request, reply) => {
        const res = await ConvexSubscribeClient.mutation(api.post.updatePost, {});
        reply.type("application/json").send(res);
    })
    
    fastify.delete("/post", async (request, reply) => {
        const res = await ConvexSubscribeClient.mutation(api.post.deletePost, {});
        reply.type("application/json").send(res);
    })
    */
})
