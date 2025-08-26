# Design System - 和風デザインガイドライン

Tourism Mobility Appの和風デザインシステムについて詳しく説明します。

## 🎨 デザインコンセプト

### 基本理念
「伝統と革新の調和」- 日本の伝統的な美意識と現代のデジタル技術を融合し、使いやすさと美しさを両立させる。

### デザイン原則
1. **簡潔性（簡素）**: 無駄を省いた洗練されたデザイン
2. **調和性（和）**: 要素間のバランスと統一感
3. **季節感（季）**: 四季の移ろいを感じられる演出
4. **品格性（品）**: 上品で落ち着いた印象

## 🌈 カラーパレット

### プライマリーカラー
```css
/* 藍色 - メインブランドカラー */
--japan-indigo: #2e4057;
--japan-indigo-light: #4a6b8a;
--japan-indigo-dark: #1a2633;

/* 朱色 - アクセントカラー */
--japan-red: #c73e1d;
--japan-red-light: #e55a3a;
--japan-red-dark: #a02f16;
```

### セカンダリーカラー
```css
/* 金色 - 特別な要素 */
--japan-gold: #daa520;
--japan-gold-light: #f4c430;
--japan-gold-dark: #b8860b;

/* 生成り - 背景色 */
--japan-cream: #f5f5dc;
--japan-cream-light: #faf8f0;
--japan-cream-dark: #e8e6d3;
```

### アクセントカラー
```css
/* 竹色 - 自然要素 */
--bamboo-green: #4a5d23;
--bamboo-green-light: #6b8533;
--bamboo-green-dark: #3a4a1c;

/* 桜色 - 季節演出 */
--sakura-pink: #ffb7c5;
--sakura-pink-light: #ffd1db;
--sakura-pink-dark: #e8a0ae;
```

### グレースケール
```css
--gray-50: #fafafa;
--gray-100: #f5f5f5;
--gray-200: #e5e5e5;
--gray-300: #d4d4d4;
--gray-400: #a3a3a3;
--gray-500: #737373;
--gray-600: #525252;
--gray-700: #404040;
--gray-800: #262626;
--gray-900: #171717;
```

## 📝 タイポグラフィ

### フォントファミリー
```css
/* メインフォント - 明朝体 */
font-family: 'Noto Serif JP', 'Yu Mincho', 'YuMincho', serif;

/* アクセントフォント - 手書き風 */
font-family: 'Klee One', 'Kosugi Maru', cursive;

/* システムフォント - UI要素 */
font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif;
```

### フォントサイズ
```css
/* 見出し */
--text-4xl: 2.25rem;  /* 36px - メインタイトル */
--text-3xl: 1.875rem; /* 30px - セクションタイトル */
--text-2xl: 1.5rem;   /* 24px - サブタイトル */
--text-xl: 1.25rem;   /* 20px - 小見出し */

/* 本文 */
--text-lg: 1.125rem;  /* 18px - 大きな本文 */
--text-base: 1rem;    /* 16px - 標準本文 */
--text-sm: 0.875rem;  /* 14px - 小さな本文 */
--text-xs: 0.75rem;   /* 12px - キャプション */
```

### 行間
```css
--leading-relaxed: 1.625; /* 本文用 */
--leading-normal: 1.5;    /* 見出し用 */
--leading-tight: 1.25;    /* コンパクト表示用 */
```

## 🖼️ アイコンシステム

### アイコンカテゴリ
```typescript
// 和風モチーフアイコン
interface WafuIcons {
  // 自然
  sakura: '🌸';      // 桜
  bamboo: '🎋';      // 竹
  maple: '🍁';       // 紅葉
  mountain: '⛰️';    // 山
  
  // 建築
  shrine: '⛩️';      // 鳥居
  temple: '🏯';      // 寺院
  lantern: '🏮';     // 提灯
  bridge: '🌉';      // 橋
  
  // 文化
  stamp: '🔖';       // 印章
  fan: '🪭';         // 扇子
  tea: '🍵';         // 茶
  bento: '🍱';       // 弁当
}
```

### アイコンサイズ
```css
--icon-xs: 1rem;    /* 16px */
--icon-sm: 1.25rem; /* 20px */
--icon-md: 1.5rem;  /* 24px */
--icon-lg: 2rem;    /* 32px */
--icon-xl: 3rem;    /* 48px */
```

## 🎭 コンポーネントスタイル

### ボタン
```css
/* 印章風ボタン */
.hanko-button {
  border-radius: 50%;
  border: 2px solid var(--japan-red);
  background: radial-gradient(circle, #fff 60%, var(--japan-red) 60%);
  box-shadow: 0 2px 8px rgba(199, 62, 29, 0.3);
  transition: all 0.3s ease;
}

.hanko-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(199, 62, 29, 0.4);
}
```

### カード
```css
/* 和風カード */
.japanese-card {
  background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  position: relative;
}

.japanese-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--japan-gold) 20%, 
    var(--japan-gold) 80%, 
    transparent 100%);
}
```

### 入力フィールド
```css
/* 和風入力フィールド */
.washi-input {
  background: var(--japan-cream);
  border: 2px solid var(--bamboo-green);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: 'Noto Serif JP', serif;
  transition: all 0.3s ease;
}

.washi-input:focus {
  border-color: var(--japan-red);
  box-shadow: 0 0 0 3px rgba(199, 62, 29, 0.1);
  outline: none;
}
```

## 🌸 アニメーション

### 桜の花びら
```css
@keyframes sakura-fall {
  0% { 
    transform: translateY(-10px) rotate(0deg); 
    opacity: 0; 
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { 
    transform: translateY(calc(100vh + 10px)) rotate(360deg); 
    opacity: 0; 
  }
}

.sakura-petal {
  position: fixed;
  width: 6px;
  height: 6px;
  background: var(--sakura-pink);
  border-radius: 50% 0 50% 0;
  animation: sakura-fall 8s linear infinite;
  pointer-events: none;
  z-index: 1;
}
```

### ホバーエフェクト
```css
/* 和風ホバーエフェクト */
.washi-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.washi-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

## 🎨 テクスチャ・パターン

### 和紙テクスチャ
```css
.washi-texture {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
  background-size: 20px 20px;
}
```

### 竹パターン
```css
.bamboo-pattern {
  background: linear-gradient(90deg, 
    var(--bamboo-green) 0%, 
    transparent 20%, 
    var(--bamboo-green) 40%, 
    transparent 60%, 
    var(--bamboo-green) 80%, 
    transparent 100%);
}
```

## 📱 レスポンシブデザイン

### ブレークポイント戦略
```css
/* モバイルファースト */
.responsive-component {
  /* モバイル: 320px - 639px */
  padding: 1rem;
  font-size: 0.875rem;
}

@media (min-width: 640px) {
  /* タブレット: 640px - 767px */
  .responsive-component {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  /* デスクトップ: 768px+ */
  .responsive-component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}
```

## ♿ アクセシビリティ

### カラーコントラスト
```css
/* WCAG AA準拠のコントラスト比 */
.text-primary { color: var(--gray-900); } /* 21:1 */
.text-secondary { color: var(--gray-700); } /* 12:1 */
.text-accent { color: var(--japan-red); } /* 4.5:1 */
```

### フォーカス表示
```css
.focus-visible {
  outline: 2px solid var(--japan-red);
  outline-offset: 2px;
  border-radius: 4px;
}
```

## 🎯 使用例

### ページヘッダー
```tsx
<header className="japanese-gradient text-white p-6 washi-texture">
  <h1 className="text-2xl font-bold font-serif">
    Tourism Mobility App
  </h1>
  <p className="text-sm opacity-90">藩境野のまち</p>
</header>
```

### スタンプカード
```tsx
<div className="japanese-card p-4 stamp-effect">
  <div className="flex items-center mb-2">
    <Award className="w-5 h-5 text-japan-red mr-2" />
    <span className="font-semibold">藩境野神社</span>
  </div>
  <button className="hanko-button w-12 h-12">
    <span className="text-xs font-bold text-japan-red">獲得</span>
  </button>
</div>
```

---

このデザインシステムは、日本の伝統的な美意識を現代のデジタルインターフェースに適用し、ユーザーに心地よい体験を提供することを目的としています。