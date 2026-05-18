const About = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Us</h1>
      <p>Автор: Мария</p>
      <p>
        Уже третье задание подряд я делаю в последний день дедлайна. Планирую в
        будущем сменить тактику. Но с другой стороны, это доступный адреналин и
        экономия на ерунде вроде прыжков с парашютом. Ну и ещё я познаю скрытые
        возможности своего мозга.
      </p>
      <p>
        Это учебный проект для курса{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React
        </a>
        .
      </p>
    </div>
  );
};

export default About;
