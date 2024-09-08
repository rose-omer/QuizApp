import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [showScore, setShowScore] = useState(false); // Scoru gösterip göstermeme kontrolü

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  // Düzeltme: Option4'ü ekledik
  let option_Array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_Array[question.ans - 1].current.classList.add("correct"); // Doğru cevabı işaretleme
      }
    }
  };

  const handleNext = () => {
    const newIndex = index + 1;
    if (newIndex < data.length) {
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(false);
      
      // Şıkları temizleme kısmı
      option_Array.map((Option) => {
        Option.current.classList.remove("wrong");
        Option.current.classList.remove("correct");
        return null;
      });
    } else {
      // Son soruya gelindiğinde scoru göster
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setShowScore(false);
    setQuestion(data[0]);
    setLock(false);
    
    // Şıkları temizleme kısmı
    option_Array.map((Option) => {
      Option.current.classList.remove("wrong");
      Option.current.classList.remove("correct");
      return null;
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!showScore ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={handleNext}>
            {index + 1 === data.length ? "Bitir" : "İleri"}
          </button>
          <div className="index">
            {index + 1} of {data.length} Soru
          </div>
        </>
      ) : (
        <>
          <h2>Senin Scorun {data.length} üzerinden {score}</h2>
          <button onClick={resetQuiz}>Tekrar Başla</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
