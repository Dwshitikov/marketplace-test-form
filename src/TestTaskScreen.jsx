import React, { useState, useEffect } from "react";
import "./TestTaskScreen.css";

export default function TestTaskScreen() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Формирование сообщения из ответов
    const message = `Новые ответы:
1. ${answers.q1}
2. ${answers.q2}
3. ${answers.q3}
4. ${answers.q4}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot7696778952:AAHLdMCzK1m_LrPsC5skXsiRQKRB5pDL2KQ/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: 6045806877, // передаём как число
            text: message,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        // Выводим описание ошибки из ответа Telegram
        throw new Error(data.description || "Ошибка отправки сообщения в Telegram");
      }

      alert("Ответы отправлены! Спасибо за ваши подробные ответы 🚀");
      console.log(answers);
      setAnswers({ q1: "", q2: "", q3: "", q4: "" });
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка отправки ответа. Пожалуйста, попробуйте ещё раз.");
    }
  };

  const questions = [
    {
      key: "q1",
      question: "1. Что вы будете делать, если продажи резко упали?",
      hint: "Опишите минимум 4 шага, которые вы предпримете.",
    },
    {
      key: "q2",
      question: "2. Как вы определяете, что реклама «работает хорошо»?",
      hint: "Укажите, на что ориентируетесь и какие метрики анализируете.",
    },
    {
      key: "q3",
      question:
        "3. Назовите 3–5 фишек или хитростей для продвижения карточек или оптимизации",
      hint: "Главное – продвинутые или нестандартные приёмы. 💡",
    },
    {
      key: "q4",
      question:
        "4. Что лучше: ставка 10 ₽ и 1000 показов или 25 ₽ и 100 показов? Почему?",
      hint: "Важно объяснить логику, а не просто выбрать вариант.",
    },
  ];

  return (
    <div className="gradient-background">
      <div className="abstract-shape" />
      <div className="container">
        {headerVisible && (
          <header className="header-box">
            <h1 className="title">⏳ Тестовое задание</h1>
            <h2 className="subtitle">для менеджера по маркетплейсам 🧑🏻‍💻</h2>
            <p className="timer">🟣 Время выполнения: 1 минута</p>
            <p className="note">
              Ответьте на вопросы ниже. Ваш опыт и логика – ключ к успеху!
            </p>
          </header>
        )}

        <main>
          {questions.map(({ key, question, hint }) => (
            <section className="question-box" key={key}>
              <p className="question">{question}</p>
              <p className="hint">{hint}</p>
              <textarea
                className="input"
                placeholder="Ваш ответ..."
                value={answers[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </section>
          ))}
        </main>

        <button className="button" onClick={handleSubmit}>
          Отправить
        </button>
      </div>
    </div>
  );
}
