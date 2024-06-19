import { useTheme } from "@emotion/react";
import Flex from "../componentLibrary/Flex";
import Card from "../componentLibrary/Card";
import Button from "../componentLibrary/Button";
import { Question } from "../types";
import { useState } from "react";

type Props = {
  questions: Question[];
  categories: string[];
  onSelectCategory: (category: string) => void;
  onSelectNumberOfQuestions: (number: number) => void;
  onStartGame: () => void;
};

export default function Placeholder(props: Props) {
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setCurrentQuestionIndex(0); // Reset index for new game
    setScore(0); // Reset score for new game
    setGameStarted(true);
    props.onStartGame();
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = props.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < props.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of game
      setCurrentQuestionIndex(0); // Reset index for new game
      setScore(0); // Reset score for new game
      setGameStarted(false); // End game
    }
  };

  if (!gameStarted) {
    return (
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Flex justifyContent="space-around" marginBottom={theme.space_huge} width="90%">
          <Card marginBottom={theme.space_md}>
            <h2>Instructions:</h2>
            <p>Welcome to the Trivia Game! Click on the button below to start the game.</p>
          </Card>
        </Flex>
        <Flex justifyContent="space-around" marginBottom={theme.space_huge} width="90%">
          <Card marginBottom={theme.space_md}>
            <h3>Select a Category:</h3>
            {props.categories.map((category, index) => (
              <Button key={index} onClick={() => props.onSelectCategory(category)}>
                {category}
              </Button>
            ))}
          </Card>
          <Card marginBottom={theme.space_md}>
            <h3>Select Number of Questions:</h3>
            {[5, 10, 15].map((number, index) => (
              <Button key={index} onClick={() => props.onSelectNumberOfQuestions(number)}>
                {number}
              </Button>
            ))}
          </Card>
        </Flex>
        <Button onClick={handleStartGame}>Start Game</Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" height="100%" width="100%">
      <Flex justifyContent="space-around" marginBottom={theme.space_huge} width="90%">
        <Card marginBottom={theme.space_md}>
          <h2>Trivia Game</h2>
          <p>
            Question {currentQuestionIndex + 1} of {props.questions.length}
          </p>
          <p>Score: {score}</p>
        </Card>
        <Card marginBottom={theme.space_md}>
          <h3>{props.questions[currentQuestionIndex]?.question}</h3>
          {props.questions[currentQuestionIndex]?.incorrect_answers.map((answer, index) => (
            <Button key={index} onClick={() => handleAnswer(answer)}>
              {answer}
            </Button>
          ))}
          <Button onClick={handleStartGame}>
            {currentQuestionIndex + 1 < props.questions.length ? "Next Question" : "New Game"}
          </Button>
        </Card>
      </Flex>
    </Flex>
  );
}
