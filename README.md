# J-Grants API Frontend

J-Grants（政府補助金ポータル）のAPIを利用した補助金検索フロントエンドアプリケーションです。

## 機能

- **補助金検索**: キーワードベースでの補助金情報検索
- **詳細表示**: 個別の補助金の詳細情報表示
- **フィルタリング**: 受付期間による絞り込み
- **ソート機能**: 作成日、更新日、受付開始日でのソート
- **ページネーション**: 大量の検索結果の分割表示

## 使用技術

- **React 18** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速なビルドツール
- **GitHub Pages** - 静的サイトホスティング
- **GitHub Actions** - 自動デプロイ

## API仕様

[J-Grants API](https://developers.digital.go.jp/documents/jgrants/api/)を使用

### 利用可能なエンドポイント

1. **補助金一覧API**
   - `GET /subsidies`
   - キーワード検索、ソート、フィルタリング機能

2. **補助金詳細API**  
   - `GET /subsidies/id/{id}`
   - 個別補助金の詳細情報取得

## 開発

### 前提条件

- Node.js 18以上
- npm

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## デプロイ

GitHub Pagesに自動デプロイされます。mainブランチにpushすると、GitHub Actionsが自動的にビルド・デプロイを実行します。

## ライセンス

MIT License