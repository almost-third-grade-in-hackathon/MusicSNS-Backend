import {Static,Type} from "@sinclair/typebox"

export const Post = Type.Object({
    user_id: Type.String(),
    content: Type.String(),
    playlist_id: Type.String(),
    music_ids: Type.Array(Type.String())
})

export type PostType = Static<typeof Post>