
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/*
handlerの引数は即席でanyにしてるので書き換えお願いします ;;
*/

/* 投稿記事取得　(フィルターない前提なんで要修正)　*/
export const getPost = query({
    /* handlerに渡す引数を指定 (要修正)*/
    args: {},
    handler: async (ctx: any, args: any) => {
        const tasks = await ctx.db
            .query("post")      //postテーブルのデータを指定
            .order("desc")      //最新データが先頭に来るようソート指定
            .take(10)       //10件取得 代わりに.collect()メソッドでテーブルの全データを指定可能
        return tasks
    }
})

/* 投稿記事検索　(未実装)*/
export const searchPost = query({
    /* handlerに渡す引数を指定 (要修正)*/
    args: {q: v.string()},
    handler: async (ctx: any, args: any) => {
        const tasks = await ctx.db
            .query("post")      //postテーブルのデータを指定
            .order("desc")      //最新データが先頭に来るようソート指定
            .take(10)       //10件取得 代わりに.collect()メソッドでテーブルの全データを指定可能
        return tasks
    }
})

/* 投稿 */
export const createPost = mutation({
    /* handlerに渡す引数を指定 (要修正)*/
    args: {
        user_id: v.id("users"),
        contents: v.string(),
        playlist_id: v.optional(v.id("playlist")), //ここどうするか
        music_id: v.optional(v.string()),   //ここどうするか
    },
    handler: async (ctx: any, args: any) => {
        /* dbにPOST */
        const tasks = await ctx.db.insert("post", {
            user_id: args.user_id,
            contents: args.contents,
            playlist_id: args.playlist_id, //ここどうするか
            music_id: args.music_id, //ここどうするか
            likes: 0,
            comments: []
        })
        return tasks
    }
})

/* 投稿更新 */
export const updatePost = mutation({
    /* handlerに渡す引数を指定 (要修正)*/
    args: {
        id: v.id("post"),
        contents: v.string(),
        playlist_id: v.optional(v.id("playlist")), //ここどうするか
        music_id: v.optional(v.string()),   //ここどうするか
    },
    handler: async (ctx: any, args: any) => {
        /* dbにPUT */
        const tasks = await ctx.db.replace(args.id, {
            contents: args.contents,
            playlist_id: args.playlist_id, //ここどうするか
            music_id: args.music_id, //ここどうするか
        })
        return tasks
    }
})


/* 記事削除　*/
export const deletePost = mutation({
    args: {id: v.id("post")}, //postテーブルのドキュメントIDを指定 (合ってるかわからんです)
    handler: async (ctx: any, args: any) => {
        const tasks = await ctx.db.delete(args.id);   //削除したい投稿のidを指定し投稿記事削除
        return tasks
    }
})