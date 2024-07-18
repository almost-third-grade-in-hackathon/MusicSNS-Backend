import type { Doc } from "./convex/_generated/dataModel"

declare module "next-auth" {
    interface Session {
        user: {

        } & Doc<"users">
    }
}