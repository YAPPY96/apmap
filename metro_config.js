// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// WebViewのHTMLファイルをアセットとして扱う
config.resolver.assetExts.push('html');

// TypeScriptファイルの解決
config.resolver.sourceExts.push('ts', 'tsx');

// キャッシュの設定
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

module.exports = config;