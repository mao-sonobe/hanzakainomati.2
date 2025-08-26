@@ .. @@
 ## 🗺️ 機能一覧

 ### **マップ機能**
-- GPS連動マップ
+- **Googleマップ統合**: リアルタイムマップ表示
+- **観光スポットピン**: 各スポットを色分けして表示
+- **インフォウィンドウ**: スポット詳細情報をポップアップ表示
+- **現在地取得**: GPS機能で現在地を表示
 - 観光スポットへのルート案内
-- 現在地表示
+- **和風マップスタイル**: 日本らしいカラーテーマ

 ### **スタンプ機能**
@@ .. @@
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
 ```

+### **Google Maps API設定**
+1. [Google Cloud Console](https://console.cloud.google.com/)でプロジェクト作成
+2. Maps JavaScript APIを有効化
+3. APIキーを取得
+4. `.env`ファイルを作成:
+```bash
+REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
+```
+
 ### **他のデバイスからアクセス**
@@ .. @@
 ## 🛠️ 技術スタック

 - **フロントエンド**: React 18 + TypeScript
+- **マップ**: Google Maps JavaScript API
 - **スタイリング**: Tailwind CSS + カスタム和風CSS
 - **アイコン**: Lucide React
 - **ビルドツール**: Vite
@@ .. @@
 ## 📱 レスポンシブ対応

 - **モバイル**: 下部ナビゲーション + 縦型レイアウト
+- **マップ**: タッチ操作対応
 - **タブレット**: 中間サイズ対応
 - **デスクトップ**: サイドバー + グリッドレイアウト
+- **マップ**: ズーム・パン操作