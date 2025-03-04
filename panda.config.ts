import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // CSSシステムの出力ディレクトリ
  outdir: "./src/styled-system",
  
  // CSSリセットを使用するかどうか
  preflight: true,

  // CSS宣言を探す場所
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // 除外するファイル
  exclude: [],

  // テーマのカスタマイズに便利
  theme: {
    extend: {},
  },

  // プリセットの設定
  presets: ['@pandacss/preset-base'],

  // ユーティリティクラスの設定
  utilities: {},
  
  // 条件付きスタイルの設定
  conditions: {},
  
  // グローバルCSSの設定
  globalCss: {},
});
