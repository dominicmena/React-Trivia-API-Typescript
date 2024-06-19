import { useTheme } from "@emotion/react";
import Flex from "../componentLibrary/Flex";
import Card from "../componentLibrary/Card";
import Button from "../componentLibrary/Button";
import { Question } from "../types";

// const PLACEHOLDERS = ["Placeholder A", "Placeholder B", "Placeholder C"];

type Props = {
  questions: Question[];
  onStartGame: () => void;
};

export default function Placeholder(props: Props) {
  const theme = useTheme();
  const [currentQuestion]

  console.log("Fetched Questions: ", props.questions);

  const handleStartGame = () => {
    props.onStartGame()
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
          <h2>Instructions:</h2>
          <p>
            Welcome to the Trivia Game! Click the button below to start a new
            game.
          </p>
          <p>Select a category and number of questions before starting the game.</p>
        </Card>
        <Select label="Select Category" options={categories}/>
        <Select label="Number of Questions" options={numbers}/>
      </Flex>
      <Button onClick={handleStartGame}>Start Game</Button>
    </Flex>
  );
}

// {PLACEHOLDERS.map((text) => {
//   return <Card key={text}>{text}</Card>;
// })}
