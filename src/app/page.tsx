import prisma from "@/lib/prisma";

async function getCourses() {
  return await prisma.course.findMany({
    include: {
      author: true,
    },
  });
}

export default async function Home() {
  const courses = await getCourses();

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1>RunShare - ランニングコース共有</h1>
        <p>登録されたランニングコースの一覧です。</p>
      </header>

      <main>
        <h2>コース一覧 ({courses.length}件)</h2>
        {courses.length === 0 ? (
          <p>
            登録されているコースはありません。データベースへの接続は正常です！
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {courses.map((course) => (
              <li
                key={course.id}
                style={{
                  border: "1px solid #e2e8f0",
                  padding: "16px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                }}
              >
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  距離: {course.distance} km | エリア: {course.area}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  作成者: {course.author.name || "名前なし"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
