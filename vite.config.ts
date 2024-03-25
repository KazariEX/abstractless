import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        dts({ rollupTypes: true }),
        vue()
    ],
    build: {
        lib: {
            entry: "lib/index.ts",
            formats: ["es"]
        },
        rollupOptions: {
            external: [
                "vue",
                "@vueuse/core"
            ]
        }
    }
});