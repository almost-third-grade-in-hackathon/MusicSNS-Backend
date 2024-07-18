import NextAuth from "next-auth"
import {ConvexAdapter} from "../ConvexProvider/index"

export const {handlers,auth,signIn,signOut} = NextAuth({
    providers: [],
    adapter: ConvexAdapter
})