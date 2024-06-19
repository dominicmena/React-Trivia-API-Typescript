import APIClient from "../api/client";
import Placeholder from "../components/Placeholder";
import { useQuery } from "react-query";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {
  const { data: questions = [], isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => props.apiClient.getQuestions(),
  });

  if (isLoadingQuestions) {
    return "Loading...";
  }

  function handleStartGame() {
    console.log("Start Game");
  }

  return <Placeholder questions={questions} onStartGame={handleStartGame} />;
}
