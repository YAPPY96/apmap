// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// SVGトランスフォーマーの設定
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// アセット拡張子からSVGを削除
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

// ソース拡張子にSVGを追加
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

module.exports = config;
module.exports = config;
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();