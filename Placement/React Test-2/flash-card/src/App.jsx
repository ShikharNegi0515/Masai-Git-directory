import { useEffect, useState } from "react";

const SESSION_TIME = 600;

const flashcards = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is 5 + 7?", answer: "12" },
  { id: 3, question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
  { id: 4, question: "What is the chemical symbol for water?", answer: "H2O" },
  { id: 5, question: "What is the speed of light in a vacuum?", answer: "299,792,458 meters per second" }
];

const localStorageKeys = {
  CORRECT_ANSWERS: "flashcardCorrectAnswers",
  INCORRECT_ANSWERS: "flashcardIncorrectAnswers",
  ATTEMPTED_CARDS: "attemptedFlashcards",
  CURRENT_CARD_INDEX: "currentFlashcardIndex",
  TIMER: "studySessionTimer",
};

export default function App() {

  const [currentIndex, setCurrentIndex] = useState(Number(localStorage.getItem(localStorageKeys.CURRENT_CARD_INDEX)) || 0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [correct, setCorrect] = useState(Number(localStorage.getItem(localStorageKeys.CORRECT_ANSWERS)) || 0)
  const [incorrect, setIncorrect] = useState(Number(localStorage.getItem(localStorageKeys.INCORRECT_ANSWERS)) || 0)
  const [attempted, setAttempted] = useState(new Set(JSON.parse(localStorage.getItem(localStorageKeys.ATTEMPTED_CARDS)) || []))
  const [timeLeft, setTimeLeft] = useState(Number(localStorage.getItem(localStorageKeys.TIMER)) || SESSION_TIME)
  const [sessionOver, setSessionOver] = useState(false)

  const currentCard = flashcards[currentIndex];
  const hasAttempted = attempted.has(currentCard.id);


  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (sessionOver) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          setSessionOver(true)
          return 0
        }
        return t - 1
      })
    }, 1000);
    return () => clearInterval(timer)
  }, [sessionOver])


  /* ---------------- PERSISTENCE ---------------- */
  useEffect(() => {
    localStorage.setItem(localStorageKeys.CORRECT_ANSWERS, correct)
    localStorage.setItem(localStorageKeys.INCORRECT_ANSWERS, incorrect)
    localStorage.setItem(localStorageKeys.ATTEMPTED_CARDS, JSON.stringify([...attempted]))
    localStorage.setItem(localStorageKeys.CURRENT_CARD_INDEX, currentIndex)
    localStorage.setItem(localStorageKeys.TIMER, timeLeft)
  }, [correct, incorrect, attempted, currentIndex, timeLeft])


  /* ---------------- HANDLERS ---------------- */
  const markAnswer = (isCorrect) => {
    if (hasAttempted) return
    setAttempted(prev => new Set([...prev, currentCard.id]))
    isCorrect ? setCorrect(c => c + 1) : setIncorrect(i => i + 1)
  }

  const nextCard = () => {
    setIsFlipped(false)
    setUserAnswer("")

    if (currentIndex == flashcards.length - 1) {
      setSessionOver(true)
    } else {
      setCurrentIndex(i => i + 1)
    }
  }

  const prevCard = () => {
    setIsFlipped(false)
    setUserAnswer("")
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }



  /* ---------------- SUMMARY ---------------- */
  if (sessionOver) {
    localStorage.clear()
    return (
      <div className="summary">
        <h2>Session Summary</h2>
        <p>Total Cards: {flashcards.length}</p>
        <p>Correct: {correct}</p>
        <p>Incorrect: {incorrect}</p>
        <p>Unattempted: {flashcards.length - attempted.size}</p>
      </div>
    )
  }


  
  /* ---------------- UI ---------------- */
  return (
    <div className="app">
      <h1>Flashcard Study</h1>

      <p>
        ⏱ Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>

      <div
        className="card"
        onClick={() => !hasAttempted && setIsFlipped(f => !f)}
      >
        {isFlipped ? currentCard.answer : currentCard.question}
      </div>

      {!isFlipped && !hasAttempted && (
        <input
          placeholder="Your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      )}

      {isFlipped && !hasAttempted && (
        <div>
          <button onClick={() => markAnswer(true)}>Correct</button>
          <button onClick={() => markAnswer(false)}>Incorrect</button>
        </div>
      )}

      {hasAttempted && <p>✅ Answer recorded</p>}

      <div className="nav">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>

      <p>✔ {correct} ❌ {incorrect}</p>
    </div>
  );
}
