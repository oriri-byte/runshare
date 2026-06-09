import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 シードデータの作成を開始します...");

  // 1. テストユーザーの作成（すでに存在していれば取得し、なければ作成する）
  const user = await prisma.user.upsert({
    where: { email: "runner@example.com" },
    update: {},
    create: {
      email: "runner@example.com",
      name: "ランナー太郎",
    },
  });

  // 2. テスト用コースの作成
  // Prisma 7.0 では Json 型には直接オブジェクトを渡すか、シリアライズした文字列を渡します
  await prisma.course.createMany({
    data: [
      {
        title: "みなとみらいランニングコース",
        description:
          "潮風を感じながら走る、初心者におすすめのフラットなコースです。",
        distance: 5.2, // km
        estimatedMinutes: 30, // 30分
        routePoints: [
          [35.457, 139.632],
          [35.463, 139.624],
        ],
        startLat: 35.457,
        startLng: 139.632,
        endLat: 35.463,
        endLng: 139.624,
        area: "横浜市中区",
        authorId: user.id,
      },
      {
        title: "代々木公園外周コース",
        description:
          "緑豊かな代々木公園の周りを走る、定番のトレーニングコースです。",
        distance: 3.1, // km
        estimatedMinutes: 18, // 18分
        routePoints: [
          [35.671, 139.694],
          [35.675, 139.699],
        ],
        startLat: 35.671,
        startLng: 139.694,
        endLat: 35.675,
        endLng: 139.699,
        area: "渋谷区",
        authorId: user.id,
      },
    ],
  });

  console.log("✅ シードデータの作成が完了しました！");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
