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
  const [answerClicked, setAnswerClicked] = useState(false); // Track if an answer has been clicked

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameFinished(false);
    setSelectedAnswer(null);
    setAnswerClicked(false); // Reset answer clicked state
  }, [props.questions]);

  const handleAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (answerClicked) return; // Prevent selecting another answer if one is already clicked

    setSelectedAnswer(selectedAnswer);
    setAnswerClicked(true); // Set answer clicked to true

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      props.logCorrectAnswer(currentQuestionIndex);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < props.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswerClicked(false); // Reset answer clicked state for next question
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
          <h3>{currentQuestion?.question}</h3>
          {[
            ...currentQuestion?.incorrect_answers,
            currentQuestion?.correct_answer,
          ]
            .sort()
            .map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(answer, currentQuestion?.correct_answer || "")}
                selected={selectedAnswer === answer}
                correct={selectedAnswer === currentQuestion?.correct_answer}
              >
                {answer}
              </Button>
            ))}
          {selectedAnswer && (
            <Button onClick={handleNextQuestion}>Next Question</Button>
          )}
        </Card>
      </Flex>
    </Flex>
  );
}
