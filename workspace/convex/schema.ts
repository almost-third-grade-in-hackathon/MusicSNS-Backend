import {defineSchema,defineTable} from "convex/server"
import {v} from "convex/values"
/* import { authTables } from "@convex-dev/auth/server"
 */
export default defineSchema({
    /* ...authTables, */
    users: defineTable({
        name: v.string(),
        icon: v.string(),
        age: v.number(),
        gender: v.union(v.literal("male"),v.literal("female")),
        genres: v.array(v.string()),
        top_five_plays: v.array(v.string()),
        playlists: v.array(v.id("playlist")),
        tokenIdentifier: v.string(),
        email: v.string()
    })
    .index("by_token",["tokenIdentifier"])
    .index("by_email",["email"]),
    playlist: defineTable({
        name: v.string(),
        music_ids: v.string(),
        likes: v.number()
    }).index("by_likes",["likes"]),
    post: defineTable({
        user_id: v.id("users"),
        contents: v.string(),
        playlist_id: v.optional(v.id("playlist")),
        music_id: v.optional(v.string()),
        likes: v.number(),
        comments: v.array(v.id("comment"))
    }),
    comment: defineTable({
        user_id: v.id("users"),
        content: v.string()
    }),
    group: defineTable({
        name: v.string(),
        user_ids: v.array(v.id("users")),
        messages: v.array(v.string())
    }),
})