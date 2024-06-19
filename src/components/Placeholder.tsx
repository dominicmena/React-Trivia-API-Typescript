// placeholder.tsx
import { useTheme } from "@emotion/react";
import Flex from "../componentLibrary/Flex";
import Card from "../componentLibrary/Card";
import Button from "../componentLibrary/Button";
import { Question } from "../types";
import { useState, useEffect } from "react";

type Props = {
  questions: Question[];
  categories: { id: number; name: string }[];
  onSelectCategory: (category: string) => void;
  onSelectNumberOfQuestions: (number: number) => void;
  onStartGame: () => void;
  onRestartGame: () => void;
  logCorrectAnswer: (questionIndex: number) => void;
  selectedNumberOfQuestions: number;
  selectedCategory: string | null;
  gameStarted: boolean;
};

export default function Placeholder(props: Props) {
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameFinished(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setIsCorrect(null);
  }, [props.questions]);

  const handleAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
      props.logCorrectAnswer(currentQuestionIndex);
    } else {
      setIsCorrect(false);
    }

    setSelectedAnswer(selectedAnswer);
    setCorrectAnswer(correctAnswer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < props.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setIsCorrect(null);
    } else {
      setGameFinished(true);
    }
  };

  const handleCategorySelect = (category: string) => {
    props.onSelectCategory(category);
  };

  const handleNumberOfQuestionsSelect = (number: number) => {
    props.onSelectNumberOfQuestions(number);
  };

  if (!props.gameStarted) {
    return (
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Flex
          justifyContent="space-around"
          marginBottom={theme.space_huge}
          width="90%"
        >
          <Card marginBottom={theme.space_md}>
            <h2>Instructions:</h2>
            <p>
              Welcome to the Trivia Game! Click on the button below to start the
              game.
            </p>
          </Card>
        </Flex>
        <Flex
          justifyContent="space-around"
          marginBottom={theme.space_huge}
          width="90%"
        >
          <Card marginBottom={theme.space_md}>
            <h3>Select a Category:</h3>
            {props.categories.slice(0, 3).map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategorySelect(category.id.toString())}
                selected={props.selectedCategory === category.id.toString()}
                correct={false}
                answered={false}
              >
                {category.name}
              </Button>
            ))}
          </Card>
          <Card marginBottom={theme.space_md}>
            <h3>Select Number of Questions:</h3>
            {[5, 10, 15].map((number) => (
              <Button
                key={number}
                onClick={() => handleNumberOfQuestionsSelect(number)}
                selected={props.selectedNumberOfQuestions === number}
                correct={false}
                answered={false}
              >
                {number}
              </Button>
            ))}
          </Card>
        </Flex>
        <Button onClick={props.onStartGame}>Start Game</Button>
      </Flex>
    );
  }

  if (gameFinished) {
    return (
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Card marginBottom={theme.space_md}>
          <h2>Game Over</h2>
          <p>
            Your final score is {score} out of {props.questions.length}.
          </p>
          <Button onClick={props.onRestartGame}>Play Again</Button>
        </Card>
      </Flex>
    );
  }

  const currentQuestion = props.questions[currentQuestionIndex];
  const { question, correct_answer, incorrect_answers } = currentQuestion;

  const allAnswers = [...incorrect_answers, correct_answer].sort();

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Flex
        justifyContent="space-around"
        marginBottom={theme.space_huge}
        width="90%"
      >
        <Card marginBottom={theme.space_md}>
          <h2>Trivia Game</h2>
          <p>
            Question {currentQuestionIndex + 1} of {props.questions.length}
          </p>
          <p>Score: {score}</p>
        </Card>
        <Card marginBottom={theme.space_md}>
          <h3>{question}</h3>
          {allAnswers.map((answer, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(answer, correct_answer)}
              selected={selectedAnswer === answer}
              correct={correctAnswer === answer}
              answered={correctAnswer !== null}
            >
              {answer}
            </Button>
          ))}
          {isCorrect !== null && (
            <p style={{ color: isCorrect ? theme.secondary : theme.error }}>
              {isCorrect ? "Correct!" : "Incorrect!"}
            </p>
          )}
          {correctAnswer && (
            <Button onClick={handleNextQuestion}>Next Question</Button>
          )}
        </Card>
      </Flex>
    </Flex>
  );
}
