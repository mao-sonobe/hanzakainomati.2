# Tourism Mobility App - 藩境野のまち観光アプリ

![Tourism Mobility App](https://img.shields.io/badge/Tourism-Mobility-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🏯 プロジェクト概要

「藩境野のまち」の雰囲気を反映した和風テイストの観光マップアプリです。GPS連動マップ、スタンプラリー、AR/VR体験、自転車シェア、飲食店連携を統合したモバイル・ウェブ対応アプリケーションです。

## ✨ 主な機能

### 🗺️ GPS連動観光マップ
- リアルタイム位置情報による観光スポット案内
- 和風デザインの地図インターフェース
- ルートナビゲーション機能

### 🏮 スタンプラリーシステム
- スポット到達時の自動スタンプ発行
- 和式帳簿デザインのコレクション画面
- 進捗管理と特典システム

### 🥽 AR/VR体験ガイド
- 多言語対応音声ガイド
- 拡張現実による歴史解説
- 体験履歴の記録・管理

### 🚲 自転車シェアサービス
- ステーション情報とリアルタイム在庫
- 予約・利用履歴管理
- エコ貢献度の可視化

### 🍵 飲食店連携機能
- 口コミ投稿システム
- クーポン獲得・管理
- 評価・レビュー機能

### 👤 マイページ
- 統計情報ダッシュボード
- 活動履歴の一覧
- 設定・プロフィール管理

## 🎨 デザインコンセプト

### 和風テイスト
- **色調**: 藍色・朱色・白・木目調の伝統的な日本色彩
- **フォント**: 明朝体と手書き風フォントの組み合わせ
- **アイコン**: 家紋・竹・梅・桜をモチーフとしたオリジナルデザイン
- **背景**: 和紙テクスチャーと季節感のある演出

### レスポンシブデザイン
- **モバイル**: 縦型レイアウト + 下部ナビゲーション
- **デスクトップ**: サイドバーナビゲーション + グリッドレイアウト
- **タブレット**: 中間サイズに最適化されたレイアウト

## 🛠️ 技術スタック

### フロントエンド
- **React** 18.3.1 - UIライブラリ
- **TypeScript** 5.5.3 - 型安全性
- **Tailwind CSS** 3.4.1 - スタイリング
- **Lucide React** - アイコンライブラリ
- **Vite** - ビルドツール

### 開発ツール
- **ESLint** - コード品質管理
- **PostCSS** - CSS処理
- **Autoprefixer** - ブラウザ互換性

## 🚀 セットアップ・実行方法

### 前提条件
- Node.js 18.0.0 以上
- npm または yarn

### インストール
```bash
# リポジトリのクローン
git clone https://github.com/your-username/tourism-mobility-app.git
cd tourism-mobility-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルド
```bash
# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## 📱 対応デバイス・ブラウザ

### モバイル
- iOS Safari 14+
- Android Chrome 90+
- PWA対応

### デスクトップ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🌐 デモサイト

**ライブデモ**: [https://tourism-mobility-dao-4mi5.bolt.host](https://tourism-mobility-dao-4mi5.bolt.host)

## 📊 プロジェクト構造

```
src/
├── App.tsx              # メインアプリケーションコンポーネント
├── main.tsx            # エントリーポイント
├── index.css           # グローバルスタイル（和風カスタムCSS含む）
├── vite-env.d.ts       # Vite型定義
└── components/         # 再利用可能コンポーネント（今後追加予定）
```

## 🎯 開発ロードマップ

### Phase 1 (完了)
- ✅ 基本UI/UX実装
- ✅ レスポンシブデザイン対応
- ✅ 和風デザインシステム構築
- ✅ ナビゲーション機能

### Phase 2 (開発中)
- 🔄 GPS/マップ機能実装
- 🔄 スタンプラリーシステム
- 🔄 自転車予約システム
- 🔄 飲食店口コミ機能

### Phase 3 (計画中)
- 📋 AR/VR機能実装
- 📋 多言語音声ガイド
- 📋 決済システム連携
- 📋 アナリティクス実装

## 💼 ビジネスモデル

### 収益源
1. **自転車シェア課金** - 利用時間・距離に応じた課金
2. **飲食店提携料** - クーポン提供による成果報酬
3. **プレミアム機能** - 月額課金による追加機能

### ターゲット市場
- 国内観光客
- インバウンド観光客
- 地域住民
- 観光事業者

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### 貢献方法
1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 開発ガイドライン
- TypeScriptの型安全性を維持
- ESLintルールに従う
- 和風デザインガイドラインを遵守
- レスポンシブデザインを考慮

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 📞 お問い合わせ

プロジェクトに関するご質問やご提案がございましたら、以下までお気軽にお問い合わせください：

- **Email**: contact@tourism-mobility.app
- **Website**: [https://tourism-mobility-dao-4mi5.bolt.host](https://tourism-mobility-dao-4mi5.bolt.host)
- **Issues**: [GitHub Issues](https://github.com/your-username/tourism-mobility-app/issues)

---

**Tourism Mobility App** - 伝統と革新が織りなす新しい観光体験 🏯✨