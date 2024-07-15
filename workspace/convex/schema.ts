import {defineSchema,defineTable} from "convex/server"
import {v} from "convex/values"

export default defineSchema({
    user: defineTable({
        name: v.string(),
        icon: v.string(),
        age: v.number(),
        gender: v.union(v.literal("male"),v.literal("female")),
        genres: v.array(v.string()),
        top_five_plays: v.array(v.string()),
        playlists: v.array(v.id("playlist")),
        tokenIdentifier: v.string()
    })
    .index("by_token",["tokenIdentifier"]),
    playlist: defineTable({
        name: v.string(),
        music_ids: v.string(),
        likes: v.number()
    }).index("by_likes",["likes"]),
    post: defineTable({
        user_id: v.id("user"),
        contents: v.string(),
        playlist_id: v.optional(v.id("playlist")),
        music_id: v.optional(v.string()),
        likes: v.number(),
        comments: v.array(v.id("comment"))
    }),
    comment: defineTable({
        user_id: v.id("user"),
        content: v.string()
    }),
    group: defineTable({
        name: v.string(),
        user_ids: v.array(v.id("user")),
        messages: v.array(v.string())
    })
})