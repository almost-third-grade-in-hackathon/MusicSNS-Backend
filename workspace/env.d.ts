declare module "process" {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                /** @param ConvexのプロジェクトID */
                CONVEX_DEPLOYMENT: string
                /** @param ConvexのデプロイURL */
                CONVEX_URL: string,
                /** @param デプロイ先のURL */
                CONVEX_SITE_URL: string,
                /** @param 使うアダプターのURL */
                CONVEX_AUTH_ADAPTER_SECRET: string
                /** @param Googleのログイン機能を使うためのID */
                GOOGLE_CLIENT_ID: string,
                /** @param Googleのログイン機能を使うための隠しトークン */
                GOOGLE_CLIENT_SECRET: string,
                /** @param SpotifyのAPIを使うためのID */
                SPOTIFY_CLIENT_ID: string
            }
        }
    }
}