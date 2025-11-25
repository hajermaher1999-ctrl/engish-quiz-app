import React, { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Load questions.json from public folder
  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error loading questions:", err));
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) {
    return <div>Loading quiz…</div>;
  }

  if (finished) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>Quiz Finished!</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>English Quiz</h2>
      <p>
        Question {current + 1} of {questions.length}
      </p>
      <h3>{q.question}</h3>
      <div>
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            style={{
              display: "block",
              margin: "8px 0",
              padding: "10px",
              width: "200px",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
