import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    createSvgSpritePlugin({
      include: '**/icons/*.svg',
      symbolId: '[name]'
    })
  ],
  server: {
    host: '192.168.1.4'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
    },
    extensions: ['.js', '.vue', '.scss', '.html', '.ts']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@assets/style/_mixins.scss"; @import "@assets/style/_variables.scss";'
      }
    }
  }
});
