import { cloudflare } from "@cloudflare/vite-plugin"
import { defineConfig } from "vite"

export default defineConfig({
  // @ts-expect-error
  plugins: [cloudflare()],
})
