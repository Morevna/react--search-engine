import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404 - Страница не найдена</h1>

      <p>
        Похоже, вы заблудились. Больше так не делайте. Если потерялись — всегда
        идите домой
      </p>

      <Link href="/">Вернуться</Link>
    </div>
  );
}
