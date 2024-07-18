import {defineSchema,defineTable} from "convex/server"
import {v} from "convex/values"
import { authTables } from "../ConvexProvider/schema"

export default defineSchema({
    ...authTables,
    playlist: defineTable({
        name: v.string(),
        /* 修正前 music_ids: v.string() */
        music_ids: v.array(v.string()), //music_idの配列に変更
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
        /*修正前 messages: v.array(v.string())*/
        comments: v.array(v.id("comment")) //comment schemaを利用
    }),
})