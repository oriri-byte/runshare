This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📌 開発方針・フェーズについて

現在の開発フェーズは **「フェーズ 1: 最小構成（MVP）の開発」** です。

開発ロードマップ（[runshare_design.md](file:///home/owner/programming/project/RunningRouteSharingService/runshare/user_guide/runshare_design.md)）には将来的な機能（ハザードマップ、評価、いいね、タグなど）の設計が含まれていますが、まずはアプリの基本機能とデータフローの動作検証を行うため、以下の最小構成でデータベースおよび機能を構築しています。

### 現在のデータベース（Prisma）構成
* **`User` モデル** (ユーザー情報)
* **`Course` モデル** (ランニングルート情報)

基本機能の実装・検証が完了した後、必要に応じて設計書に定義されている追加テーブル（NextAuth用の認証テーブル、および Tag, Review, Like, HazardPoint など）を順次追加・マイグレーションしていきます。

