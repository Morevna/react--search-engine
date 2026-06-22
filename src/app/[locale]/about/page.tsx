type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isRu = locale === "ru";

  return (
    <div style={{ padding: "20px" }}>
      <h1>{isRu ? "О нас" : "About Us"}</h1>

      <p>{isRu ? "Автор: Мария" : "Author: Maria"}</p>

      <p>
        {isRu 
          ? "Уже которое задание подряд я делаю в последний день дедлайна. Планирую в будущем сменить тактику."
          : "For several assignments in a row, I've been doing them on the final day. I plan to change this tactic in the future."}
      </p>

      <p>
        {isRu ? "Это учебный проект для курса " : "This is an educational project for the "}
        <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
          RS School React
        </a>
      </p>
    </div>
  );
}