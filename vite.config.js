import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import fs from "fs";
const host = "school-app.local";

export default defineConfig({
    server: {
        host,
        hmr: { host },
        https: {
            key: fs.readFileSync(`D:/laragon/etc/ssl/laragon.key`),
            cert: fs.readFileSync(`D:/laragon/etc/ssl/laragon.crt`),
        },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        {
            name: "blade",
            handleHotUpdate({ file, server }) {
                if (file.endsWith(".blade.php")) {
                    server.ws.send({
                        type: "full-reload",
                        path: "*",
                    });
                }
            },
        },
    ],
});
