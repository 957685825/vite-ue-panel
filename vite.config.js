import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
// import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    open: true
  },
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
    // copy({
    //   targets: [
    //     { src: './public', dest: './dist' }
    //   ]
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './public')
    }
  }
  // build: {
  //   terserOptions: {
  //     compress: {
  //       drop_console: true
  //     }
  //   },
  //   outDir: 'public',
  //   assetsDir: 'wap'
  // }
})
