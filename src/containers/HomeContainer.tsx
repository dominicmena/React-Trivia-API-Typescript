import APIClient from "../api/client";
import Placeholder from "../components/Placeholder";
import { useQuery } from "react-query";
import { useState } from "react";
import { Question } from "../types/index";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {
  const [gameStarted, setGameStarted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const { isLoading, isError, data } = useQuery("questions", () => props.apiClient.getQuestions(),
  );

  const handleStartGame = () => {
    setGameStarted(true)
    setQuestions(data)
  }

  if (isLoading) {
    return "Loading...";
  }

 if (isError) {
  return "Error loading questions. Please try again."
 }
  return gameStarted ? (
   <Placeholder questions={questions} onStartGame={handleStartGame} />
  ) : (
  <Placeholder questions={[]} onStartGame={handleStartGame}/>
  )
}
