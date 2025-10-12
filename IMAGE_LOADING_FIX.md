# 画像読み込み問題の修正内容

## 問題の原因

実機環境で画像が読み込めない問題は、以下の複数の要因が組み合わさって発生していました:

### 1. **URL設定の不備**
- `Config.ts`でJSONファイルのURLに`/`が不足していた
- 例: `${SERVER_BASE_URL}announcements.json` → `${SERVER_BASE_URL}/announcements.json`

### 2. **iOS App Transport Security (ATS) の設定不足**
- `koudaisai.com`ドメインがATS例外リストに含まれていなかった
- HTTPSでも一部の暗号化設定で接続が拒否される可能性があった

### 3. **Androidネットワークセキュリティ設定の不足**
- `network_security_config.xml`が存在しなかった
- クリアテキスト通信の設定が不明確だった

### 4. **画像キャッシュ設定の不足**
- `expo-image`のキャッシュポリシーが設定されていなかった
- 優先度設定がなく、遅延読み込みが発生していた

### 5. **ネットワークタイムアウトの未設定**
- `fetch`にタイムアウトが設定されていなかった
- 接続が遅い環境で無限に待機する可能性があった

## 修正内容

### 1. Config.ts の修正
```typescript
// JSONファイルのURLに/を追加
ANNOUNCEMENTS_URL: `${SERVER_BASE_URL}/announcements.json`,
BUILDINGS_URL: `${SERVER_BASE_URL}/buildings.json`,
// ...他のURLも同様
```

### 2. iOS ATS設定の追加 (app.json & Info.plist)
```json
"koudaisai.com": {
  "NSIncludesSubdomains": true,
  "NSExceptionAllowsInsecureHTTPLoads": false,
  "NSExceptionRequiresForwardSecrecy": false
}
```

### 3. Android ネットワークセキュリティ設定
- `android/app/src/main/res/xml/network_security_config.xml` を新規作成
- `AndroidManifest.xml`に設定を追加

### 4. 画像コンポーネントの最適化
すべての画像に以下の属性を追加:
```typescript
<Image
  source={{ uri: imageUrl }}
  cachePolicy="memory-disk"  // メモリとディスクでキャッシュ
  transition={200}            // スムーズな表示
  priority="high"             // 高優先度で読み込み
/>
```

### 5. useRemoteData フックの改善
- 30秒のタイムアウトを追加
- AbortControllerでリクエストを制御
- エラー時も既存データを保持

### 6. RemoteImage コンポーネントの作成
- ローディングインジケーター表示
- エラーハンドリングとフォールバック画像
- 再利用可能なコンポーネント

## ビルドと確認手順

### iOS
```bash
# クリーンビルド
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# 実機ビルド
npx expo run:ios --device
```

### Android
```bash
# クリーンビルド
cd android
./gradlew clean
cd ..

# 実機ビルド
npx expo run:android --device
```

## テスト項目

実機で以下を確認してください:

1. ✅ イベント一覧画面で画像が表示される
2. ✅ ステージ一覧画面で画像が表示される
3. ✅ その他イベント画面で画像が表示される
4. ✅ 建物5253画面で画像が表示される
5. ✅ モーダル詳細画面で画像が表示される
6. ✅ 通信が遅い環境でもローディング表示がされる
7. ✅ オフライン→オンライン復帰時に画像が読み込まれる

## さらなる最適化案 (オプション)

### 1. 画像のプリロード
アプリ起動時に主要な画像をプリロードすることで、表示速度を向上:

```typescript
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';

// イベントデータ取得後にプリロード
useEffect(() => {
  if (eventData) {
    const imageUrls = eventData.map(e => `${Config.IMAGE_BASE_URL}/${e.image}`);
    Image.prefetch(imageUrls);
  }
}, [eventData]);
```

### 2. 画像の最適化
サーバー側で以下を実施:
- 画像をWebPフォーマットに変換
- サムネイル用の小さいサイズを用意
- CDN (CloudFlare, Fastly等) の導入

### 3. オフライン対応の強化
```typescript
import * as FileSystem from 'expo-file-system';

// 画像を端末にダウンロードして保存
const downloadAndCacheImage = async (url: string) => {
  const filename = url.split('/').pop();
  const fileUri = `${FileSystem.documentDirectory}${filename}`;
  
  const info = await FileSystem.getInfoAsync(fileUri);
  if (info.exists) {
    return fileUri;
  }
  
  await FileSystem.downloadAsync(url, fileUri);
  return fileUri;
};
```

## トラブルシューティング

### 画像がまだ表示されない場合

1. **ネットワーク接続を確認**
   ```bash
   # サーバーへの接続確認
   curl -I https://www.koudaisai.com/admin/wp-content/dataforapp/image/test.jpg
   ```

2. **アプリのキャッシュをクリア**
   - iOS: アプリを削除して再インストール
   - Android: 設定 → アプリ → ストレージ → キャッシュをクリア

3. **ログを確認**
   ```bash
   # iOS
   npx react-native log-ios
   
   # Android
   npx react-native log-android
   ```

4. **画像URLが正しいか確認**
   ブラウザで直接URLを開いて確認:
   `https://www.koudaisai.com/admin/wp-content/dataforapp/image/[画像名].jpg`

### よくあるエラーメッセージ

- **"Network request failed"**: ネットワーク接続またはATS設定の問題
- **"Request timeout"**: サーバーレスポンスが遅い or タイムアウト
- **404 Not Found**: 画像URLが間違っている
- **403 Forbidden**: サーバー側のアクセス制限

## 参考資料

- [Expo Image Documentation](https://docs.expo.dev/versions/latest/sdk/image/)
- [iOS App Transport Security](https://developer.apple.com/documentation/security/preventing_insecure_network_connections)
- [Android Network Security Config](https://developer.android.com/training/articles/security-config)
- [React Native Performance](https://reactnative.dev/docs/performance)
