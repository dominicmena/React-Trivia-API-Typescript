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

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
  }, [props.questions]);

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = props.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
      props.logCorrectAnswer(currentQuestionIndex);
    }

    if (currentQuestionIndex + 1 < props.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      props.onRestartGame();
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
                style={{
                  backgroundColor:
                    props.selectedCategory === category.id.toString()
                      ? "blue"
                      : "initial",
                }}
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
                style={{
                  backgroundColor:
                    props.selectedNumberOfQuestions === number
                      ? "blue"
                      : "initial",
                }}
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
          <h3>{props.questions[currentQuestionIndex]?.question}</h3>
          {[
            ...props.questions[currentQuestionIndex]?.incorrect_answers,
            props.questions[currentQuestionIndex]?.correct_answer,
          ]
            .sort()
            .map((answer, index) => (
              <Button key={index} onClick={() => handleAnswer(answer)}>
                {answer}
              </Button>
            ))}
        </Card>
      </Flex>
    </Flex>
  );
}
