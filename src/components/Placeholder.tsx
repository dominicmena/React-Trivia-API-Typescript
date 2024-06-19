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

  

  console.log("Fetched Questions: ", props.questions);

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
        {PLACEHOLDERS.map((text) => {
          return <Card key={text}>{text}</Card>;
        })}
      </Flex>
      <Button onClick={props.onStartGame}>Example Button</Button>
    </Flex>
  );
}
