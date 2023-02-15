import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // element-plus
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"], // 类型： string[] 导入时想要省略的扩展名列表。
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/styles/variables.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      "element-plus/lib/locale/lang/zh-cn",
      "element-plus/lib/locale/lang/en",
    ],
  },
  server: {
    hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层

    // 服务配置
    port: 3000, // 类型： number 指定服务器端口;
    open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: {
      // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
      "/api": {
        target: "http://106.12.45.247:3000/",
        changeOrigin: true,
        secure: false,
        // eslint-disable-next-line no-shadow
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
});
