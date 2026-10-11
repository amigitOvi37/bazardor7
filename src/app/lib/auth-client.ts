import { createAuthClient } from "better-auth/react"

// Trailing whitespace in a .env value breaks origin matching, so trim it.
const baseURL = (process.env.BETTER_AUTH_URL ?? "").trim() || undefined;

export const authClient = createAuthClient({
    baseURL
})

export const { signIn, signUp, useSession } = authClient
