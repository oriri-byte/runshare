# 🛠️ RunShare 初期セットアップガイド

このガイドは、[runshare_design.md](file:///home/owner/programming/project/RunningRouteSharingService/runshare_design.md) に基づき、プロジェクトの初期設定（Phase 1）をあなた自身の手で進めるためのステップ・バイ・ステップの解説書です。

各コマンドは、ターミナルで実行してください。

---

## 📌 STEP 1: Next.js プロジェクトの初期化

まずは、プロジェクトのルートディレクトリで Next.js アプリケーションを初期化します。
CSS Modules（Vanilla CSS）を使用するため、Tailwind CSS は無効化（`No`）にします。

### 1. 初期化コマンドの実行
以下のコマンドを実行します。最後の `.` は「現在のディレクトリに作成する」という意味です。
```bash
npx create-next-app@latest .
```

### 2. 対話型プロンプトへの回答
実行するといくつか質問が表示されるので、以下のように選択してください：
* **Would you like to use TypeScript?** → `Yes` (型安全性の確保)
* **Would you like to use ESLint?** → `Yes` (静的コード解析)
* **Would you like to use Tailwind CSS?** → `No` (設計に従い Vanilla CSS / CSS Modules を使用するため)
* **Would you like to use `src/` directory?** → `Yes` (コードの整理用)
* **Would you like to use App Router? (recommended)** → `Yes` (最新のルーティングシステム)
* **Would you like to use React Compiler (experimental)?** → `No` (安定稼働優先)
* **Would you like to customize the default import alias (@/*)?** → `No`

---

## 📦 STEP 2: 必要なパッケージのインストール

Next.js のセットアップが完了したら、設計書で指定されているライブラリ群をインストールします。

### 1. 本番用依存パッケージのインストール
以下のコマンドで、データベース接続 (Prisma Client)、地図 (Leaflet)、認証 (NextAuth/Auth.js)、バリデーション (Zod)、アイコン (Lucide) をインストールします。
```bash
npm install @prisma/client leaflet zod next-auth@beta lucide-react
```

### 2. 開発用依存パッケージのインストール
以下のコマンドで、TypeScript 用の型定義ファイルと、データベース操作ツール (Prisma CLI) をインストールします。
```bash
npm install -D prisma @types/leaflet
```

---

## 🗄️ STEP 3: ORM (Prisma) の初期化と設定

Prisma を使って、PostgreSQL データベースとの接続とテーブル設計を行います。

### 1. Prisma の初期化
```bash
npx prisma init
```
これにより、以下の2つのファイル/フォルダが作成されます：
- `prisma/schema.prisma` (データベースのテーブル定義ファイル)
- `.env` (環境変数を管理するファイル。データベース接続用URLが追加されます)

### 2. スキーマファイルの記述
`prisma/schema.prisma` を開き、中身を [runshare_design.md の「Prisma スキーマ」](file:///home/owner/programming/project/RunningRouteSharingService/runshare_design.md#L286-L466) に記載されているコードで上書きします。

### 3. 環境変数の設定
`.env` ファイルを開き、データベース接続文字列を実際の PostgreSQL サーバーの設定に合わせて編集します。
```env
DATABASE_URL="postgresql://ユーザー名:パスワード@localhost:5432/データベース名?schema=public"
```

### 4. マイグレーションの実行
スキーマ定義をもとに、PostgreSQL 上にテーブルを作成します。
```bash
npx prisma migrate dev --name init
```
これでデータベースの準備は完了です。

---

## 🔑 STEP 4: NextAuth.js (Auth v5) の認証初期設定

ユーザー認証を行うための認証用シークレットキーと、最小限の Auth.js 設定ファイルを作成します。

### 1. 認証用シークレットキーの生成
`.env` ファイルに `AUTH_SECRET` を追加します。以下のコマンドを実行すると、自動的に生成されて `.env` に追加されます。
```bash
npx auth secret
```
*(コマンドが動かない場合は、任意のランダムな文字列を生成して `.env` に `AUTH_SECRET="ランダムな文字列"` として記述してください。)*

### 2. 認証設定ファイルの作成
`src/auth.ts`（NextAuth のコア設定）と `src/middleware.ts`（ページ保護用ミドルウェア）を新規作成します。
これらは、後ほどプロバイダ（Google や GitHub）を登録する際に編集していきます。

---

## 🎨 STEP 5: デザインシステム (CSS) の設定

Next.js はデフォルトでいくつかのスタイリングファイルを作成します。

1. `src/app/globals.css` の中身を空にして、設計書に定義されているカラーパレットや基本フォントの設定を CSS 変数として記述します。
2. Google Fonts から **Outfit** と **Noto Sans JP** を読み込む設定を `src/app/layout.tsx` の `<head>` または `next/font` を用いて記述します。
