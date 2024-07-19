import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Playlistに関するデータの操作を行う
 */

export const CreateList = mutation({
    args: {
        name: v.string(),
        ids: v.array(v.string()),
    },
    handler: async(ctx, args) =>{
        const list = await ctx.db.insert("playlist",{
            name: args.name,
            music_ids: args.ids,
            likes: 0
        })
        return list
    },
})
export const ReadList = query({
    args: {
        id: v.id("playlist")
    },
    handler: async(ctx, args) =>{
        const list = await ctx.db.get(args.id)
        if(list === null) throw new Error("Not Found List")
        return list
    },
})
export const ReadLists = query({
    args: {},
    handler: async(ctx, args) =>{
        const lists = await ctx.db.query("playlist")
            .take(10)
        return  lists
    }
})
export const UpdateList = mutation({
    args: {
        name: v.optional(v.string()),
        ids: v.optional(v.array(v.string())),
        list_id: v.id("playlist")
    },
    handler: async(ctx, args) =>{
        await ctx.db.patch(args.list_id,{
            name: args.name,
            music_ids: args.ids,
        })
    },
})
export const DeleteList = mutation({
    args: {
        id: v.id("playlist")
    },
    handler: async(ctx, args) =>{
        await ctx.db.delete(args.id)
    },
})