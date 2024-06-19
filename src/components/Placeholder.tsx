import { useTheme } from "@emotion/react";
import Flex from "../componentLibrary/Flex";
import Card from "../componentLibrary/Card";
import Button from "../componentLibrary/Button";
import { Question } from "../types";
import { useState } from "react";

// const PLACEHOLDERS = ["Placeholder A", "Placeholder B", "Placeholder C"];

type Props = {
  questions: Question[];
  onStartGame: () => void;
};

export default function Placeholder(props: Props) {
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setCurrentQuestionIndex(0); //reset index for new game
    setScore(0); //reset score for new game
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
      //end of game
      setCurrentQuestionIndex(0) //reset index for new game
      setScore(0); // reset score for new game
      setGameStarted(false) //end game 
    }
  }

  // console.log("Fetched Questions: ", props.questions);

if (!gameStarted) {
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
        </Card>
      </Flex>
      <Button onClick={props.onStartGame}>Example Button</Button>
    </Flex>
  );
}
}

// {PLACEHOLDERS.map((text) => {
//   return <Card key={text}>{text}</Card>;
// })}