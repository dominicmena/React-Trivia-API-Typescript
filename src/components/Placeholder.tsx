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
  onRestartGame: (score: number) => void;
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
  const [answered, setAnswered] = useState(false); // Track if an answer has been selected

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameFinished(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setIsCorrect(null);
    setAnswered(false); // Reset answer state
  }, [props.questions]);

  const handleAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (!answered) {
      // Allow selection only if no answer has been chosen yet
      if (selectedAnswer === correctAnswer) {
        setIsCorrect(true);
        setScore(score + 1);
        props.logCorrectAnswer(currentQuestionIndex);
      } else {
        setIsCorrect(false);
      }

      setSelectedAnswer(selectedAnswer);
      setCorrectAnswer(correctAnswer);
      setAnswered(true); // Mark as answered
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < props.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setIsCorrect(null);
      setAnswered(false); // Reset answer state for next question
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
        <Flex justifyContent="center" marginTop={theme.space_huge} width="45%">
          <Card marginBottom={theme.space_lg}>
            {" "}
            {/* Increased marginBottom */}
            <h2>Instructions:</h2>
            <p>
              Welcome to the Trivia Game! Test your knowledge by selecting any
              of the categories below and the number of questions you want to
              answer. For each correct answer, one point will be added to your
              score. A wrong answer is zero points. Click on the "Start Game"
              button after your selections to start the game.
            </p>
          </Card>
        </Flex>
        <Flex
          justifyContent="center"
          marginBottom={theme.space_huge}
          width="90%"
        >
          {/* Flex container for category and number of questions selection */}
          <Flex direction="column" width="50%">
            {/* Category selection */}
            <Card
              style={{ padding: theme.space_md, marginBottom: theme.space_lg }}
            >
              <h3>Select a Category:</h3>
              <Flex justifyContent="center" marginBottom={theme.space_sm}>
                {props.categories.slice(0, 3).map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id.toString())}
                    selected={props.selectedCategory === category.id.toString()}
                    correct={false}
                    answered={false}
                    style={{
                      marginRight: theme.space_sm,
                      marginBottom: theme.space_sm,
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </Flex>
            </Card>
            {/* Number of questions selection */}
            <Card style={{ padding: theme.space_md }}>
              <h3>Select Number of Questions:</h3>
              <Flex justifyContent="center" width="40%">
                {[5, 10, 15].map((number) => (
                  <Button
                    key={number}
                    onClick={() => handleNumberOfQuestionsSelect(number)}
                    selected={props.selectedNumberOfQuestions === number}
                    correct={false}
                    answered={false}
                    style={{
                      marginRight: theme.space_sm,
                      marginBottom: theme.space_sm,
                    }}
                  >
                    {number}
                  </Button>
                ))}
              </Flex>
            </Card>
            <Button onClick={props.onStartGame}>Start Game</Button>
          </Flex>
        </Flex>
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
          <Button onClick={() => {

            console.log(score)
            return props.onRestartGame(score)} }>Play Again</Button>
        </Card>
      </Flex>
    );
  }

  const currentQuestion = props.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null; // Return null if there's no current question to avoid rendering an empty section
  }

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
      
      
    
      <Card marginBottom={theme.space_md}>
        <h2>Trivia Game</h2>
        <p style={{ marginBottom: theme.space_xs }}>
          Question {currentQuestionIndex + 1} of {props.questions.length}
        </p>
        <p style={{ marginBottom: theme.space_xs }}>Score: {score}</p>
      </Card>
      <Card marginBottom={theme.space_md}>
        <h3>{question}</h3>
      </Card>
      <Card marginBottom={theme.space_md}>
        <Flex justifyContent="center">
          {allAnswers.map((answer, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(answer, correct_answer)}
              selected={selectedAnswer === answer}
              correct={correctAnswer === answer}
              answered={correctAnswer !== null}
              disabled={answered} // Disable buttons once answered
              style={{
                marginRight: theme.space_sm,
                marginBottom: theme.space_sm,
              }} // Adjusted marginRight and added marginBottom
            >
              {answer}
            </Button>
          ))}
        </Flex>
      </Card>
      <Card style={{ display: "flex" }}>
        {/* Display score and next question button */}
        {isCorrect !== null && (
          <p style={{ color: isCorrect ? theme.secondary : theme.error }}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </p>
        )}
        {correctAnswer && (
          <Button onClick={handleNextQuestion} style={{ marginLeft: "auto" }}>
            Next Question
          </Button>
        )}
      </Card>
      
    </Flex>
    
  );
}
