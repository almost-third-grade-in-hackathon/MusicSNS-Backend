import NextAuth from "next-auth"
import Google from "@auth/core/providers/google"
import {ConvexAdapter} from "../ConvexProvider/index"

export const {auth,signIn,signOut} = NextAuth({
    providers: [Google({
        client: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET
        },
    })],
    adapter: ConvexAdapter,
    callbacks: {
        async session({session}) {
            return session
        }
    },
    session: {strategy: "database"},
})